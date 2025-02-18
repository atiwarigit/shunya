import React from 'react';
import {
  SentimentSatisfiedAlt as GoodIcon,
  SentimentNeutral as OkayIcon,
  SentimentDissatisfied as NotGreatIcon,
  CenterFocusStrong as FocusIcon,
  BatteryChargingFull as EnergyIcon,
  Lightbulb as ClarityIcon,
  Warning as OverwhelmIcon,
} from '@mui/icons-material';

export const MOOD_ICONS: Record<string, React.ReactElement> = {
  'Good': <GoodIcon color="success" />,
  'Okay': <OkayIcon color="warning" />,
  'Not Great': <NotGreatIcon color="error" />,
};

export const STATE_ICONS: Record<string, React.ReactElement> = {
  'Focus': <FocusIcon color="primary" fontSize="small" />,
  'Energy': <EnergyIcon color="primary" fontSize="small" />,
  'Clarity': <ClarityIcon color="primary" fontSize="small" />,
  'Overwhelm': <OverwhelmIcon color="error" fontSize="small" />,
}; 