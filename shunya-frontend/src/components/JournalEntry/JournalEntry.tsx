import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle,
  Mic as MicIcon,
  Stop as StopIcon,
  PhotoCamera as CameraIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { MOOD_ICONS, STATE_ICONS } from './constants';
import { Entry } from '../../types';

interface JournalEntryProps {
  onSave: (entry: Omit<Entry, 'id' | 'timestamp'>) => Promise<void>;
  editingEntry?: Entry;
  onCancelEdit?: () => void;
}

// Add type assertion for the Speech Recognition API
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const JournalEntry: React.FC<JournalEntryProps> = ({
  onSave,
  editingEntry,
  onCancelEdit,
}) => {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [image, setImage] = useState<{ url: string; caption?: string } | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageCaption, setImageCaption] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingEntry) {
      setText(editingEntry.text);
      setSelectedMood(editingEntry.mood);
      setSelectedStates(editingEntry.states);
      setImage(editingEntry.image || null);
    }
  }, [editingEntry]);

  useEffect(() => {
    // Initialize speech recognition
    if (SpeechRecognitionAPI) {
      try {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setText(prev => prev + ' ' + transcript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping speech recognition:', error);
        }
      }
    };
  }, []);

  const handleSave = async () => {
    if (!selectedMood || !text.trim()) return;

    setIsSaving(true);
    try {
      await onSave({
        text,
        mood: selectedMood,
        states: selectedStates,
        image: image || undefined,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (!editingEntry) {
          setText('');
          setSelectedMood(null);
          setSelectedStates([]);
          setImage(null);
        }
      }, 2000);
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsRecording(!isRecording);
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImage({ url });
        setImageCaption('');
        setShowImageDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDialogClose = () => {
    setShowImageDialog(false);
    if (!image?.caption) {
      setImage(null);
    }
  };

  const handleImageCaptionSave = () => {
    if (image) {
      setImage({ ...image, caption: imageCaption });
    }
    setShowImageDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: '#F8FAFC' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#334155' }}>
        How are you feeling?
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        {Object.entries(MOOD_ICONS).map(([mood, icon]) => (
          <Chip
            key={mood}
            label={mood}
            icon={React.cloneElement(icon)}
            onClick={() => setSelectedMood(mood)}
            variant={selectedMood === mood ? 'filled' : 'outlined'}
            sx={{
              borderRadius: '16px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        ))}
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: '#334155', mt: 2 }}>
        Current state:
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Object.entries(STATE_ICONS).map(([state, icon]) => (
          <Chip
            key={state}
            label={state}
            icon={React.cloneElement(icon)}
            onClick={() => handleStateToggle(state)}
            variant={selectedStates.includes(state) ? 'filled' : 'outlined'}
            sx={{
              borderRadius: '16px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts here..."
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FFFFFF',
            },
          }}
        />
        
        <Box sx={{ 
          position: 'absolute', 
          right: 8, 
          bottom: 16, 
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          padding: '4px',
          borderRadius: '8px',
        }}>
          <Tooltip title={isRecording ? "Stop Recording" : "Start Voice Input"}>
            <IconButton
              onClick={toggleRecording}
              color={isRecording ? "error" : "default"}
              sx={{
                animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              {isRecording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          </Tooltip>
          
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <Tooltip title="Add Image">
            <IconButton onClick={() => fileInputRef.current?.click()}>
              <CameraIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {image && (
        <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
          <img
            src={image.url}
            alt={image.caption || 'Journal entry image'}
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              borderRadius: '8px',
            }}
          />
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
              },
            }}
            onClick={() => setImage(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {image.caption && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                color: 'text.secondary',
              }}
            >
              {image.caption}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {editingEntry && (
          <Button
            variant="outlined"
            onClick={onCancelEdit}
            disabled={isSaving}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!selectedMood || !text.trim() || isSaving}
          sx={{
            position: 'relative',
            minWidth: 100,
          }}
        >
          {isSaving ? (
            <CircularProgress size={24} color="inherit" />
          ) : showSuccess ? (
            <CheckCircle />
          ) : (
            editingEntry ? 'Update' : 'Save'
          )}
        </Button>
      </Box>

      <Dialog open={showImageDialog} onClose={handleImageDialogClose}>
        <DialogTitle>Add Image Caption</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
            placeholder="Add a caption to your image (optional)"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose}>Skip</Button>
          <Button onClick={handleImageCaptionSave} variant="contained">
            Save Caption
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}; 