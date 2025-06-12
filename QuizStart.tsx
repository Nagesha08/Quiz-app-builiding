import React from 'react';
import { Play, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { categories, getCategoryIcon, getCategoryColor } from '../data/questions';
import { QuizStats } from '../types/quiz';

interface QuizStartProps {
  onStartQuiz: (category: string) => void;
  stats: QuizStats;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStartQuiz, stats }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Programming Quiz
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Master your coding skills with our comprehensive quiz covering HTML, CSS, JavaScript, TypeScript, SQL, and PHP
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.totalQuizzes}
            </div>
            <div className="text-white/70">Quizzes Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round(stats.averageScore)}%
            </div>
            <div className="text-white/70">Average Score</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {Object.keys(stats.categoryStats).length}
            </div>
            <div className="text-white/70">Categories Explored</div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Challenge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryStats = stats.categoryStats[category];
              const accuracy = categoryStats 
                ? Math.round((categoryStats.correct / categoryStats.total) * 100)
                : 0;

              return (
                <div
                  key={category}
                  className="group cursor-pointer"
                  onClick={() => onStartQuiz(category)}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl border border-white/20">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mb-4 text-2xl`}>
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                    {categoryStats && (
                      <div className="text-sm text-white/70 mb-4">
                        Accuracy: {accuracy}% ({categoryStats.correct}/{categoryStats.total})
                      </div>
                    )}
                    <div className="flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
              <span>Choose a programming language</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
              <span>Answer 10 randomized questions</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
              <span>Complete within 5 minutes</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
              <span>Get detailed results & explanations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

