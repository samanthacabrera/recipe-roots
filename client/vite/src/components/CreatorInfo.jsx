import React from 'react';

function CreatorInfo({ creatorPhoto, creatorName, creatorNickname, creatorBio, memory, country }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">About the Creator</h2>
            {creatorPhoto && (
                <img src={creatorPhoto} alt={`${creatorName}'s photo`} className="mb-2 rounded-full" />
            )}
            <p className="mb-1"><strong>Name:</strong> {creatorName}</p>
            <p className="mb-1"><strong>Nickname:</strong> {creatorNickname}</p>
            <p className="mb-1"><strong>Bio:</strong> {creatorBio}</p>
            <p className="text-gray-800"><span className="font-bold">Memory:</span> {memory}</p>
        </div>
    );
}

export default CreatorInfo;
