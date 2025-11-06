'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { COMPETENCIES } from '@/lib/assessmentData';
import { RadarChart } from '@/components/ui/RadarChart';

interface CompetencyScore {
  id: string;
  name: string;
  averageScore: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const { state } = useAssessment();
  const [competencyScores, setCompetencyScores] = useState<CompetencyScore[]>([]);

  useEffect(() => {
    // Calculate average scores for each competency
    const scores: CompetencyScore[] = COMPETENCIES.map(competency => {
      const responses = state.responses[competency.id] || {};
      const values = Object.values(responses);

      const average = values.length > 0
        ? values.reduce((sum, score) => sum + score, 0) / values.length
        : 0;

      return {
        id: competency.id,
        name: competency.name,
        averageScore: Math.round(average * 100) / 100, // Round to 2 decimals
      };
    });

    setCompetencyScores(scores);

    // If no responses, redirect to home
    if (scores.every(s => s.averageScore === 0)) {
      router.push('/');
    }
  }, [state.responses, router]);

  // Export to CSV with detailed breakdown
  const handleDownloadCSV = () => {
    const lines: string[] = [];

    // Title row
    lines.push('Product Designer Skills Assessment - Results');
    lines.push('');

    // Header
    lines.push('Competency,Statement,Score');

    // Build rows for each competency
    COMPETENCIES.forEach(competency => {
      const responses = state.responses[competency.id] || {};
      let totalScore = 0;
      let count = 0;

      // Add each statement score
      competency.statements.forEach((statement, index) => {
        const score = responses[statement.id] || 0;
        totalScore += score;
        count++;

        const statementLabel = `Statement ${index + 1}`;
        lines.push(`"${competency.name}","${statementLabel}: ${statement.text}",${score}`);
      });

      // Calculate and add average
      const average = count > 0 ? (totalScore / count).toFixed(2) : '0.00';
      lines.push(`"${competency.name}","AVERAGE",${average}`);

      // Empty row between competencies
      lines.push('');
    });

    const csvContent = lines.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'product-designer-assessment-results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare data for radar chart
  const chartData = competencyScores.map(c => ({
    label: c.name,
    value: c.averageScore,
  }));

  return (
    <div className="min-h-screen" style={{ padding: 'clamp(32px, 6.67vw, 64px)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-fluid-2xl text-center">
          <h1 className="font-header text-[clamp(80px,13.9vw,356px)] font-bold text-text leading-[0.9]">
            your aura
          </h1>
        </header>

        {/* Radar Chart */}
        <section style={{ marginBottom: 'clamp(24px, 3.33vw, 32px)' }}>
          <RadarChart data={chartData} />
        </section>

        {/* Results Table */}
        <section style={{ marginBottom: 'clamp(24px, 3.33vw, 32px)' }}>
          <h2 className="font-body text-2xl font-bold text-text mb-4">
            Results
          </h2>

          <div className="border-2 border-border bg-card-bg overflow-x-auto" style={{ borderRadius: 'clamp(12px, 1.67vw, 16px)' }}>
            <table className="w-full">
              <tbody>
                {competencyScores.map((competency, index) => (
                  <tr
                    key={competency.id}
                    className={`border-b-2 border-border hover:bg-hover transition-colors ${
                      index === competencyScores.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-fluid-sm text-fluid-body font-semibold text-text">
                      {competency.name}
                    </td>
                    <td className="p-fluid-sm text-right text-fluid-h4 font-bold text-text">
                      {competency.averageScore.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t-4 border-border" style={{ paddingTop: 'clamp(24px, 3.33vw, 32px)', marginBottom: 'clamp(24px, 3.33vw, 32px)' }}>
          <button
            onClick={() => router.push('/')}
            className="btn w-full sm:w-auto"
          >
            Back to home
          </button>

          <button
            onClick={handleDownloadCSV}
            className="btn w-full sm:w-auto"
          >
            Download results as CSV
          </button>
        </section>

        {/* Footer Note */}
        <footer className="text-center">
          <p className="text-fluid-small text-muted">
            Your results are saved locally in your browser. To retake the assessment, clear your responses from the home page.
          </p>
        </footer>
      </div>
    </div>
  );
}
