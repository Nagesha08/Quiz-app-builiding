import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import QuizStart from './components/QuizStart';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';

function App() {
  const {
    currentSession,
    currentQuestion,
    currentQuestionIndex,
    timeRemaining,
    stats,
    progress,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz
  } = useQuiz();

  // Show start screen
  if (!currentSession) {
    return <QuizStart onStartQuiz={startQuiz} stats={stats} />;
  }

  // Show results screen
  if (currentSession.isCompleted) {
    return (
      <QuizResults
        session={currentSession}
        onRestart={() => startQuiz(currentSession.category)}
        onHome={resetQuiz}
      />
    );
  }

  // Show question screen
  if (currentQuestion) {
    const hasAnswered = currentQuestion.id in currentSession.answers;
    const selectedAnswer = currentSession.answers[currentQuestion.id];

    return (
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={currentSession.questions.length}
        timeRemaining={timeRemaining}
        progress={progress}
        onAnswer={(answerIndex) => answerQuestion(currentQuestion.id, answerIndex)}
        onNext={nextQuestion}
        hasAnswered={hasAnswered}
        selectedAnswer={selectedAnswer}
      />
    );
  }

  // Fallback
  return <QuizStart onStartQuiz={startQuiz} stats={stats} />;
}

export default App;
