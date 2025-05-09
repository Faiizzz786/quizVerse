import React from 'react';

function HintSection({ getHint, hints }) {
  const hintTypes = [
    { id: 'definition', label: 'Definition' },
    { id: 'synonym', label: 'Synonym' },
    { id: 'category', label: 'Category' },
    { id: 'emoji', label: 'Emoji Clues' },
    { id: 'riddle', label: 'Riddle' },
    { id: 'haiku', label: 'Haiku' },
    { id: 'funny-description', label: 'Funny Description' },
    { id: 'animal-analogy', label: 'Animal Analogy' },
    { id: 'superhero-power', label: 'Superhero Power' },
    { id: 'historical-figure', label: 'Historical Figure' }
  ];
  
  
  return (
    <div className="hint-section p-4 rounded">
      <h4 className="mb-3">Need a Hint?</h4>
      
      <div className="d-flex gap-2 mb-3">
        {hintTypes.map(type => (
          <button
            key={type.id}
            className="btn btn-outline-secondary"
            onClick={() => getHint(type.id)}
            disabled={hints.some(hint => hint.type === type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      {hints.length > 0 && (
        <div className="hints-display">
          {hints.map((hint, index) => (
            <div key={index} className="alert alert-light">
              <strong>{hintTypes.find(t => t.id === hint.type)?.label}:</strong> {hint.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HintSection;