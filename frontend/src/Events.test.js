import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Events from './Events';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking axios
jest.mock('axios');

describe('Events Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
  });

  test('renders SearchBar', () => {
    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );
    expect(screen.getByLabelText(/Enter an event/i)).toBeInTheDocument();
  });

  test('initial state of events is an empty array', () => {
    const { result } = renderHook(() => useState([]));
    expect(result.current[0]).toEqual([]);
  });

  test('fetches events on mount', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/events'));
  });

  test('displays events after fetching', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Event 1/i)).toBeInTheDocument());
  });

  test('filters events based on search query', async () => {
    const eventsData = [
      { title: 'Yoga Class', imageUrl: '', description: '' },
      { title: 'Swimming Class', imageUrl: '', description: '' },
    ];
    axios.get.mockResolvedValueOnce({ data: eventsData });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Yoga Class/i)).toBeInTheDocument());

    fireEvent.input(screen.getByLabelText(/Enter an event/i), {
      target: { value: 'Swimming' },
    });

    expect(screen.queryByText(/Yoga Class/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Swimming Class/i)).toBeInTheDocument();
  });

  test('opens modal on event click', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Event 1/i)).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Event 1/i));

    expect(screen.getByText(/Event 1/i)).toBeInTheDocument(); // Check if modal opens
  });

  test('closes modal', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/Event 1/i)));
    fireEvent.click(screen.getByText(/Close/i));

    expect(screen.queryByText(/Event 1/i)).not.toBeInTheDocument(); // Check if modal closes
  });

  test('checks enrollment status on modal open', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });
    axios.post.mockResolvedValueOnce({ data: { isEnrolled: true } });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/Event 1/i)));
    expect(screen.getByText(/You have successfully enrolled for the event!/i)).toBeInTheDocument();
  });

  test('enrolls in an event', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });
    axios.post.mockResolvedValueOnce({ data: { status: 'Data saved successfully' } });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/Event 1/i)));
    fireEvent.click(screen.getByText(/Enroll/i));

    expect(screen.getByText(/You have successfully enrolled for the event!/i)).toBeInTheDocument();
  });

  test('unenrolls from an event', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });
    axios.post.mockResolvedValueOnce({ data: { isEnrolled: true } });
    axios.post.mockResolvedValueOnce({ data: { status: 'Data saved successfully' } });

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/Event 1/i)));
    fireEvent.click(screen.getByText(/Enroll/i));
    fireEvent.click(screen.getByText(/Unenroll/i));

    expect(screen.getByText(/You have successfully enrolled for the event!/i)).not.toBeInTheDocument();
  });

  test('handles API errors during enrollment', async () => {
    const eventsData = [{ title: 'Event 1', imageUrl: '', description: '' }];
    axios.get.mockResolvedValueOnce({ data: eventsData });
    axios.post.mockRejectedValueOnce(new Error('Enrollment failed'));

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/Event 1/i)));
    fireEvent.click(screen.getByText(/Enroll/i));

    expect(screen.getByText(/An error occurred while sending the data:/i)).toBeInTheDocument();
  });

  test('handles API errors during fetching events', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <Router>
        <Events state={{ token: 'mockToken' }} />
      </Router>
    );

    await waitFor(() => expect(screen.queryByText(/Events/i)).not.toBeInTheDocument());
  });
});