import React, { useState, useEffect } from 'react';
import { Flame, TrendingUp, AlertCircle, Heart, CheckCircle, Info, Calendar, BarChart3 } from 'lucide-react';

const BurnoutAssessment = () => {
  const [currentScore, setCurrentScore] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const assessmentOptions = [
    {
      value: 1,
      label: "I enjoy my work. I have no symptoms of burnout.",
      color: "from-green-400 to-emerald-500"
    },
    {
      value: 2,
      label: "Occasionally, I am under stress, and I don't always have as much energy as I once did, but I don't feel burned out.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      value: 3,
      label: "I am definitely burning out and have one or more symptoms of burnout, such as physical and emotional exhaustion.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      value: 4,
      label: "The symptoms of burnout that I'm experiencing won't go away. I think about frustration at work a lot.",
      color: "from-orange-500 to-red-500"
    },
    {
      value: 5,
      label: "I feel completely burned out and often wonder if I can go on. I am at the point where I may need some changes or may need to seek some sort of help.",
      color: "from-red-500 to-rose-600"
    }
  ];

  const getInterpretation = (score) => {
    if (score <= 2) {
      return {
        title: "No Burnout Detected",
        description: "You're currently managing well and not experiencing significant burnout symptoms. Continue maintaining healthy work-life boundaries.",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    } else {
      return {
        title: "Burnout Symptoms Present",
        description: "You're experiencing symptoms of burnout. This is a signal to prioritize your wellbeing and consider interventions.",
        icon: AlertCircle,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      };
    }
  };

  const getRecommendations = (score) => {
    if (score === 1) {
      return [
        "Maintain your current healthy practices",
        "Continue setting clear work-life boundaries",
        "Consider what's working well for you and protect those habits",
        "Stay connected with colleagues and support networks"
      ];
    } else if (score === 2) {
      return [
        "Monitor your energy levels and stress patterns",
        "Ensure you're taking regular breaks throughout the day",
        "Practice stress management techniques proactively",
        "Maintain social connections outside of work",
        "Consider reassessing workload if symptoms persist"
      ];
    } else if (score === 3) {
      return [
        "Acknowledge that burnout is developing and take action now",
        "Speak with your supervisor about workload concerns",
        "Schedule time for self-care activities",
        "Consider meeting with a mental health professional",
        "Evaluate what specific aspects of work are most draining",
        "Take your vacation time and truly disconnect"
      ];
    } else if (score === 4) {
      return [
        "Seek support from a mental health professional",
        "Have an honest conversation with your supervisor about needed changes",
        "Consider taking time off to recover",
        "Identify specific work changes that would help",
        "Connect with trusted colleagues or mentors",
        "Explore whether your current role aligns with your values"
      ];
    } else {
      return [
        "Seek immediate support from a mental health professional",
        "Consider taking medical leave if possible",
        "Reach out to HR or employee assistance programs",
        "Talk to trusted friends, family, or colleagues about what you're experiencing",
        "Explore whether significant job or career changes are needed",
        "Remember: seeking help is a sign of strength, not weakness"
      ];
    }
  };

  const handleSubmit = () => {
    if (currentScore !== null) {
      const newEntry = {
        score: currentScore,
        date: new Date().toISOString(),
        dateFormatted: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      setAssessmentHistory([newEntry, ...assessmentHistory]);
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentScore(null);
    setShowResults(false);
  };

  const interpretation = currentScore ? getInterpretation(currentScore) : null;
  const recommendations = currentScore ? getRecommendations(currentScore) : null;
  const InterpretationIcon = interpretation?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur rounded-full px-6 py-4 shadow-lg mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Burnout Assessment
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            A validated single-item screening measure for occupational burnout
          </p>
        </div>

        {!showResults ? (
          /* Assessment Card */
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Overall, based on your definition of burnout, how would you rate your level of burnout?
              </h2>
              <p className="text-gray-600 text-sm">
                Select the statement that best describes how you're feeling about work right now:
              </p>
            </div>

            <div className="space-y-3">
              {assessmentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentScore(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    currentScore === option.value
                      ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg scale-[1.02]`
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      currentScore === option.value
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.value}
                    </div>
                    <p className={`flex-1 ${
                      currentScore === option.value ? 'text-white' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={currentScore === null}
              className={`w-full mt-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${
                currentScore === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              View Results & Recommendations
            </button>
          </div>
        ) : (
          /* Results Card */
          <div className="space-y-6">
            {/* Interpretation */}
            <div className={`${interpretation.bgColor} border-2 ${interpretation.borderColor} rounded-3xl p-8`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`${interpretation.color}`}>
                  <InterpretationIcon className="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${interpretation.color} mb-2`}>
                    {interpretation.title}
                  </h3>
                  <p className="text-gray-700">
                    {interpretation.description}
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Your Selected Response:</p>
                <p className="text-gray-800">
                  {assessmentOptions[currentScore - 1].label}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-800">
                  Recommended Actions
                </h3>
              </div>
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 flex-1">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crisis Resources */}
            {currentScore >= 4 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-800 mb-2">Crisis Resources</h4>
                    <p className="text-red-700 text-sm mb-3">
                      If you're experiencing thoughts of self-harm or suicide, please reach out for immediate help:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• <strong>National Suicide Prevention Lifeline:</strong> 988 (US)</li>
                      <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                      <li>• <strong>Emergency Services:</strong> 911 (or your local emergency number)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetAssessment}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {assessmentHistory.length > 0 && (
          <div className="mt-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-800">Assessment History</h3>
            </div>
            <div className="space-y-2">
              {assessmentHistory.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{entry.dateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      entry.score <= 2 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      Level {entry.score}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                      entry.score <= 2 ? 'bg-green-400' : 'bg-orange-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
            {assessmentHistory.length > 5 && (
              <p className="text-xs text-gray-500 mt-3 text-center">
                Showing 5 most recent assessments
              </p>
            )}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 mt-6">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-2"
          >
            <Info className="w-5 h-5" />
            About This Assessment
          </button>
          
          {showInfo && (
            <div className="text-sm text-gray-600 space-y-2 mt-4 pl-7">
              <p>
                This single-item measure has been validated against the Maslach Burnout Inventory in multiple studies with healthcare professionals and other workers.
              </p>
              <p>
                Research shows this measure correlates strongly with emotional exhaustion (r = 0.64-0.80) and has good sensitivity and specificity for detecting burnout.
              </p>
              <p className="text-xs text-gray-500 italic">
                References: Rohland et al. (2004), West et al. (2009), Dolan et al. (2015), Hansen & Girgis (2010)
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500 space-y-1">
          <p>
            This is a screening tool, not a diagnostic instrument. For comprehensive assessment and treatment, consult a healthcare professional.
          </p>
          <p>
            Based on validated research in occupational health psychology
          </p>
        </div>
      </div>
    </div>
  );
};

export default BurnoutAssessment;
