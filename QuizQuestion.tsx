import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types/quiz';
import { getCategoryColor, getCategoryIcon } from '../data/questions';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  progress: number;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  hasAnswered: boolean;
  selectedAnswer?: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  progress,
  onAnswer,
  onNext,
  hasAnswered,
  selectedAnswer
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (!hasAnswered) {
      onAnswer(answerIndex);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(question.category)} rounded-full flex items-center justify-center text-xl`}>
              {getCategoryIcon(question.category)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{question.category} Quiz</h1>
              <p className="text-white/70">Question {questionNumber} of {totalQuestions}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-red-400' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/70 text-sm text-center">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-white leading-relaxed">
                {question.question}
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`px-3 py-1 rounded-full text-white ${
                  question.difficulty === 'easy' ? 'bg-green-500' :
                  question.difficulty === 'medium' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  {question.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-500 text-white rounded-full">
                  {question.points} pts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const isWrong = hasAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={hasAnswered}
                    className={`text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                      hasAnswered
                        ? isCorrect
                          ? 'bg-green-500/20 border-green-400 text-white'
                          : isWrong
                          ? 'bg-red-500/20 border-red-400 text-white'
                          : 'bg-white/5 border-white/20 text-white/70'
                        : 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      {hasAnswered && isCorrect && <CheckCircle className="w-6 h-6 text-green-400" />}
                      {hasAnswered && isWrong && <XCircle className="w-6 h-6 text-red-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Explanation
              </h3>
              <p className="text-white/90 leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
