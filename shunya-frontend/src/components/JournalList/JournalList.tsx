import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import {
  SentimentSatisfiedAlt as GoodIcon,
  SentimentNeutral as OkayIcon,
  SentimentDissatisfied as NotGreatIcon,
  CenterFocusStrong as FocusIcon,
  BatteryChargingFull as EnergyIcon,
  Lightbulb as ClarityIcon,
  Warning as OverwhelmIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { JournalEntry } from '../../types/journal';
import { Entry } from '../../types';
import { JournalEntryListItem } from './JournalEntryListItem';

const STATE_ICONS: Record<string, React.ReactElement> = {
  'Focus': <FocusIcon fontSize="small" />,
  'Energy': <EnergyIcon fontSize="small" />,
  'Clarity': <ClarityIcon fontSize="small" />,
  'Overwhelm': <OverwhelmIcon fontSize="small" />,
};

const MOOD_ICONS: Record<string, React.ReactElement> = {
  'Good': <GoodIcon color="success" />,
  'Okay': <OkayIcon color="warning" />,
  'Not Great': <NotGreatIcon color="error" />,
};

interface JournalListProps {
  entries: Entry[];
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (entryId: string) => void;
}

export const JournalList: React.FC<JournalListProps> = ({
  entries,
  onEditEntry,
  onDeleteEntry,
}) => {
  if (entries.length === 0) {
    return (
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          bgcolor: '#F8FAFC',
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No journal entries yet. Start writing to see your entries here!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {entries.map((entry) => (
        <JournalEntryListItem
          key={entry.id}
          entry={entry}
          onEdit={() => onEditEntry(entry)}
          onDelete={() => onDeleteEntry(entry.id)}
        />
      ))}
    </Box>
  );
};

export default JournalList; 