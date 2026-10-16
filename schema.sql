-- ============================================================================
-- NEET-PG / INI-CET Chapterwise PYQ Practice & Test App
-- Production PostgreSQL Schema + Row Level Security (RLS) for Supabase
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT 'Doctor',
  target_exam TEXT NOT NULL DEFAULT 'NEET-PG' CHECK (target_exam IN ('NEET-PG', 'INI-CET')),
  exam_date DATE NOT NULL DEFAULT '2027-03-15',
  college TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  daily_goal INT NOT NULL DEFAULT 50,
  current_streak INT NOT NULL DEFAULT 0,
  last_active_date DATE,
  razorpay_customer_id TEXT,
  razorpay_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUBJECTS TABLE (All 19 NEET-PG Subjects)
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT UNIQUE NOT NULL,
  display_order INT NOT NULL DEFAULT 1,
  icon_name TEXT DEFAULT 'BookOpen',
  is_free_tier BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CHAPTERS TABLE
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 1,
  high_yield BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subject_id, name)
);

-- 4. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  image_url TEXT,
  options JSONB NOT NULL CHECK (jsonb_array_length(options) = 4),
  correct_option INT NOT NULL CHECK (correct_option BETWEEN 0 AND 3),
  explanation TEXT NOT NULL,
  exam_name TEXT NOT NULL DEFAULT 'NEET-PG',
  exam_year INT NOT NULL CHECK (exam_year BETWEEN 2000 AND 2035),
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  tags TEXT[] DEFAULT '{}',
  is_sample BOOLEAN NOT NULL DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ATTEMPTS TABLE (Every question solved in Practice or Test mode + Spaced Repetition)
CREATE TABLE IF NOT EXISTS public.attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option INT CHECK (selected_option BETWEEN 0 AND 3),
  is_correct BOOLEAN NOT NULL,
  time_taken_sec INT NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'practice' CHECK (mode IN ('practice', 'test', 'revision')),
  is_confusing BOOLEAN NOT NULL DEFAULT FALSE,
  srs_stage INT NOT NULL DEFAULT 0, -- 0: Immediate, 1: 1d, 2: 3d, 3: 7d, 4: 15d
  next_review_at TIMESTAMPTZ,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TESTS TABLE (Chapter, Subject, Grand, or Custom Tests)
CREATE TABLE IF NOT EXISTS public.tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  test_type TEXT NOT NULL CHECK (test_type IN ('chapter', 'subject', 'grand', 'custom')),
  total_questions INT NOT NULL,
  duration_sec INT NOT NULL,
  remaining_sec INT NOT NULL,
  marks_correct NUMERIC(4,2) NOT NULL DEFAULT 4.00,
  marks_wrong NUMERIC(4,2) NOT NULL DEFAULT -1.00,
  marks_unattempted NUMERIC(4,2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'paused', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 7. TEST_QUESTIONS TABLE (Per-question state inside a test)
CREATE TABLE IF NOT EXISTS public.test_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  question_order INT NOT NULL,
  selected_option INT CHECK (selected_option BETWEEN 0 AND 3),
  marked_for_review BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_sec INT NOT NULL DEFAULT 0,
  UNIQUE(test_id, question_id)
);

-- 8. TEST_RESULTS TABLE (Summary metrics after test submission)
CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID UNIQUE NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score NUMERIC(6,2) NOT NULL,
  max_score NUMERIC(6,2) NOT NULL,
  correct_count INT NOT NULL,
  wrong_count INT NOT NULL,
  unattempted_count INT NOT NULL,
  accuracy_pct NUMERIC(5,2) NOT NULL,
  avg_time_per_q_sec NUMERIC(6,2) NOT NULL,
  subject_breakdown JSONB DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  is_confusing BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- 10. NOTES TABLE (Personal student notes per question)
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- 11. DAILY_GOALS TABLE (Daily question targets & completion logs)
CREATE TABLE IF NOT EXISTS public.daily_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  goal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_questions INT NOT NULL DEFAULT 50,
  completed_questions INT NOT NULL DEFAULT 0,
  UNIQUE(user_id, goal_date)
);

-- ============================================================================
-- PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_questions_subject_chapter ON public.questions(subject_id, chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_year ON public.questions(exam_year, difficulty);
CREATE INDEX IF NOT EXISTS idx_attempts_user_question ON public.attempts(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_next_review ON public.attempts(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_tests_user_status ON public.tests(user_id, status);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_goals ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role without recursion
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users read/update own profile; Admins can view all profiles for stats
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin_user());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Subjects, Chapters, Questions: Everyone authenticated can read; only Admins can write
CREATE POLICY "Anyone can view subjects" ON public.subjects FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL USING (public.is_admin_user());

CREATE POLICY "Anyone can view chapters" ON public.chapters FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage chapters" ON public.chapters FOR ALL USING (public.is_admin_user());

CREATE POLICY "Anyone can view questions" ON public.questions FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage questions" ON public.questions FOR ALL USING (public.is_admin_user());

-- Student-specific tables: Strictly scoped to auth.uid() = user_id
CREATE POLICY "Own attempts only" ON public.attempts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own tests only" ON public.tests
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own test_questions only" ON public.test_questions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.tests t WHERE t.id = test_id AND t.user_id = auth.uid())
  );

CREATE POLICY "Own test_results only" ON public.test_results
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own bookmarks only" ON public.bookmarks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own notes only" ON public.notes
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Own daily_goals only" ON public.daily_goals
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Auto-create profile row on Auth Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SUPABASE STORAGE BUCKET ('question-images') FOR CLINICAL IMAGES
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('question-images', 'question-images', TRUE, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for question-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'question-images');

CREATE POLICY "Admins upload and manage question-images" ON storage.objects
  FOR ALL USING (bucket_id = 'question-images' AND public.is_admin_user())
  WITH CHECK (bucket_id = 'question-images' AND public.is_admin_user());
