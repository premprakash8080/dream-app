import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleDreamFavorite } from '../../features/dreams/dreamSlice';
import ModeratorReply from './ModeratorReply';
import FavoriteButton from './FavoriteButton';

const DreamDetails = ({ dream }) => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    dispatch(toggleDreamFavorite(dream.id));
  };

  return (
    <div className="space-y-8">
      {/* Header with Favorite Button */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-medium text-xl">
              {dream.user?.avatar}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-lg">{dream.user?.name}</h3>
            <time 
              dateTime={dream.createdAt}
              className="text-sm text-gray-500"
            >
              {new Date(dream.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
        <FavoriteButton
          isFavourite={dream.isFavourite}
          onToggle={handleFavoriteToggle}
        />
      </div>

      {/* Dream Image */}
      {dream.image && (
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md">
          <img
            src={dream.image}
            alt={dream.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Title and Description */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{dream.title}</h2>
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {dream.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      {dream.tags && dream.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {dream.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Moderator Reply Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Moderator's Interpretation</h3>
        <ModeratorReply reply={dream.moderatorReply} />
      </div>
    </div>
  );
};

DreamDetails.propTypes = {
  dream: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    isFavourite: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    moderatorReply: PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string,
      moderator: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string
      })
    })
  }).isRequired
};

export default DreamDetails; 