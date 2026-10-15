import React, { useState } from 'react';
import { X, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';
import { CommentItem, Article } from '../types';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  comments: CommentItem[];
  onAddComment: (comment: CommentItem) => void;
  onUpvote: (id: string) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  article,
  comments,
  onAddComment,
  onUpvote
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'editorsPicks'>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !article) return null;

  const articleComments = comments.filter((c) => c.articleId === article.id);
  const displayedComments =
    activeTab === 'editorsPicks'
      ? articleComments.filter((c) => c.isEditorsPick)
      : articleComments;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      articleId: article.id,
      author: authorName.trim() || 'Verified Reader',
      location: authorLocation.trim() || 'New York, NY',
      timestamp: 'Just now',
      text: newCommentText.trim(),
      upvotes: 1
    };

    setIsSubmitting(true);
    setTimeout(() => {
      onAddComment(newComment);
      setNewCommentText('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-md h-full shadow-2xl flex flex-col border-l border-gray-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-serif font-bold text-lg text-nyt-black">
              Reader Discussion
            </h3>
            <p className="text-[11px] text-gray-500 font-sans line-clamp-1">
              {article.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: All Comments vs NYT Picks */}
        <div className="flex border-b border-gray-200 px-4 pt-2 bg-white text-xs font-sans">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'all'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            All Comments ({articleComments.length})
          </button>
          <button
            onClick={() => setActiveTab('editorsPicks')}
            className={`pb-2 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'editorsPicks'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            NYT Picks ({articleComments.filter((c) => c.isEditorsPick).length})
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayedComments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs font-serif">
              Be the first to share your perspective on this report.
            </div>
          ) : (
            displayedComments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 bg-gray-50 border border-gray-200 rounded-sm space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <div>
                    <span className="font-bold text-gray-900 mr-1.5">
                      {comment.author}
                    </span>
                    <span className="text-gray-500">{comment.location}</span>
                  </div>
                  <span className="text-gray-400">{comment.timestamp}</span>
                </div>

                {comment.isEditorsPick && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                    NYT Pick
                  </span>
                )}

                <p className="font-serif text-xs text-gray-800 leading-relaxed">
                  {comment.text}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-gray-200 text-[10px] text-gray-500 font-sans">
                  <button
                    onClick={() => onUpvote(comment.id)}
                    className="flex items-center gap-1 hover:text-black cursor-pointer font-medium"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Recommend ({comment.upvotes})</span>
                  </button>
                  <span className="text-gray-400">Reply</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Post comment box */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-gray-50 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              placeholder="Your Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-hidden focus:border-black"
            />
            <input
              type="text"
              placeholder="City, State"
              value={authorLocation}
              onChange={(e) => setAuthorLocation(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-hidden focus:border-black"
            />
          </div>
          <div className="flex gap-2">
            <textarea
              rows={2}
              placeholder="Join the discussion... (Comments are moderated)"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-serif outline-hidden focus:border-black resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newCommentText.trim()}
              className="bg-black text-white hover:bg-gray-800 disabled:opacity-40 px-3 rounded flex items-center justify-center cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
