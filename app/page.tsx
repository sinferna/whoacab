import StreakHeader from "./components/StreakHeader";
import WordCard from "./components/WordCard";
import DifficultyBadge from "./components/DifficultyBadge";
import QuestionSection from "./components/QuizSelection";
import CheckButton from "./components/CheckButton";
import BottomNav from "./BottomNavigation";

export default function WordOfDayPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-24">
      <div className="w-full max-w-md px-4 pt-6">
        <StreakHeader streak={6} progress={0.8} />
        <DifficultyBadge difficulty="HARD" />
        <WordCard
          word="la·con·ic"
          phonetic="/ləˈkɒnɪk/"
          partOfSpeech="adjective"
          definition="using very few words in speech or writing."
        />
        <QuestionSection />
        <CheckButton />
      </div>
      <BottomNav />
    </div>
  );
}