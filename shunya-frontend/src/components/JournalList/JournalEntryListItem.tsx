import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Entry } from '../../types';
import { MOOD_ICONS, STATE_ICONS } from '../JournalEntry/constants';

interface JournalEntryListItemProps {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
}

export const JournalEntryListItem: React.FC<JournalEntryListItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete();
  };

  const previewText = entry.text.slice(0, 150) + (entry.text.length > 150 ? '...' : '');

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          bgcolor: '#F8FAFC',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {React.cloneElement(MOOD_ICONS[entry.mood])}
            <Typography variant="subtitle1">{entry.mood}</Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 'auto', mr: 2 }}
          >
            {format(new Date(entry.timestamp), 'MMM d, yyyy · h:mm a')}
          </Typography>
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{ mr: 1 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setShowDeleteDialog(true)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {entry.image && (
          <Box sx={{ mb: 2 }}>
            <img
              src={entry.image.url}
              alt={entry.image.caption || 'Journal entry image'}
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
            {entry.image.caption && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                {entry.image.caption}
              </Typography>
            )}
          </Box>
        )}

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            whiteSpace: 'pre-wrap',
            cursor: 'pointer',
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? entry.text : previewText}
          {entry.text.length > 150 && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'primary.main',
                ml: 1,
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          )}
        </Typography>

        {entry.states.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {entry.states.map((state) => (
              <Chip
                key={state}
                label={state}
                icon={React.cloneElement(STATE_ICONS[state])}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        )}
      </Paper>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Delete Journal Entry?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this journal entry? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 