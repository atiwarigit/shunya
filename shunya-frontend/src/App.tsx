import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { JournalEntry } from './components/JournalEntry/JournalEntry';
import { JournalList } from './components/JournalList/JournalList';
import { Entry } from './types';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();

  const handleSaveEntry = async (entry: Omit<Entry, 'id' | 'timestamp'>) => {
    // Simulate a delay for processing/NLP analysis
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newEntry: Entry = {
      ...entry,
      id: editingEntry?.id || Date.now().toString(),
      timestamp: editingEntry?.timestamp || new Date().toISOString(),
    };

    if (editingEntry) {
      setEntries(prev =>
        prev.map(e => (e.id === editingEntry.id ? newEntry : e))
      );
      setEditingEntry(undefined);
    } else {
      setEntries(prev => [newEntry, ...prev]);
    }
  };

  const handleEditEntry = (entry: Entry) => {
    setEditingEntry(entry);
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const handleCancelEdit = () => {
    setEditingEntry(undefined);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#1E293B',
            letterSpacing: '-0.5px',
          }}
        >
          Shunya Journal
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#64748B' }}
        >
          A mindful space for your thoughts and reflections
        </Typography>
      </Box>

      <JournalEntry
        onSave={handleSaveEntry}
        editingEntry={editingEntry}
        onCancelEdit={handleCancelEdit}
      />

      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: '#334155',
            fontWeight: 500,
          }}
        >
          Your Entries
        </Typography>
        <JournalList
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </Box>
    </Container>
  );
}

export default App;
