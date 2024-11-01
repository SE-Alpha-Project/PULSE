import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, List, ListItem, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Footer from './Footer';

const Calender = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ title: '', date: '', time: '', notes: '' });

  // Function to add a new session
  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.time) {
      setSessions([...sessions, { ...newSession, id: Date.now() }]);
      setNewSession({ title: '', date: '', time: '', notes: '' });
    }
  };

  // Function to delete a session
  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div>
      {/* Input form for adding a new gym session */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Schedule a New Gym Session</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            <TextField
              label="Session Title"
              fullWidth
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={newSession.time}
              onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={newSession.notes}
              onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddSession}>Add Session</Button>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Display list of scheduled sessions */}
      <Accordion style={{ marginTop: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Upcoming Gym Sessions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List style={{ width: '100%' }}>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <ListItem key={session.id} style={{ borderBottom: '1px solid #ccc' }}>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6">{session.title}</Typography>
                    <Typography variant="body2">Date: {session.date}</Typography>
                    <Typography variant="body2">Time: {session.time}</Typography>
                    <Typography variant="body2">Notes: {session.notes}</Typography>
                  </div>
                  <IconButton onClick={() => handleDeleteSession(session.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No sessions scheduled.</Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Footer />
    </div>
  );
};

export default Calender;
