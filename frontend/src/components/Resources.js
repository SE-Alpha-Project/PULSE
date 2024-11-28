// frontend/src/components/Resources.js
import * as React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField"; // New import for TextField
import Footer from "./Footer";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem for dropdown
import Select from "@mui/material/Select"; // Import Select for dropdown

const defaultTheme = createTheme();

export default function Resources(props) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(9);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query
    const [favorites, setFavorites] = useState([]); // New state for favorites
    const [sortOrder, setSortOrder] = useState("newest"); // New state for sort order

    if (loading || error) {
        ;
    }

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/resources");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResources(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 9);
    };

    // Filter resources based on search query
    const filteredResources = resources.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by title
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by description
    );

    // Sort resources based on selected order
    const sortedResources = filteredResources.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB; // Newest first or oldest first
    });

    // Toggle favorite status
    const toggleFavorite = (article) => {
        if (favorites.includes(article)) {
            setFavorites(favorites.filter(fav => fav !== article)); // Remove from favorites
        } else {
            setFavorites([...favorites, article]); // Add to favorites
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            News & Blogs
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Discover a wealth of articles, blogs, and news dedicated to helping you achieve your wellness goals. Stay informed with the latest tips, workouts, nutrition advice, and wellness insights that can help you live a healthier life.
                        </Typography>
                    </Container>
                </Box>
                <Container>
                    {/* Search Input and Button */}
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Search Articles"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                            sx={{ mr: 2 }} // Margin right for spacing
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setVisibleCount(filteredResources.length); // Show all filtered results
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                    {/* Sort Order Dropdown */}
                    <Box sx={{ mb: 2 }}>
                        <Select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="newest">Newest First</MenuItem>
                            <MenuItem value="oldest">Oldest First</MenuItem>
                        </Select>
                    </Box>
                    <Grid container spacing={4}>
                        {sortedResources.slice(0, visibleCount).map((article, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        image={article.urlToImage || 'default-image-url.jpg'} // Provide a default image URL
                                        alt={article.title}
                                        sx={{ height: '150px', width: '100%', objectFit: 'cover' }} // Fixed height for images
                                    />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h5" component="div" noWrap>
                                            {article.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {article.description || article.summary}  {/* Use appropriate field */}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Published on: {new Date(article.publishedAt).toLocaleDateString()}  {/* Format date */}
                                        </Typography>
                                        {/* New Google Search Button */}
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                href={`https://www.google.com/search?q=${encodeURIComponent(article.title)}`} // Link to Google search
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Search on Google
                                            </Button>
                                            {/* Favorite Button */}
                                            <Button
                                                variant="outlined"
                                                color={favorites.includes(article) ? "secondary" : "default"}
                                                onClick={() => toggleFavorite(article)}
                                                sx={{ mt: 1 }}
                                            >
                                                {favorites.includes(article) ? "Unfavorite" : "Favorite"}
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {visibleCount < sortedResources.length && ( // Update to use sortedResources
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                onClick={handleShowMore}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: '#FFAA3D',
                                    },
                                }}
                            >
                                Show More
                            </Button>
                        </Box>
                    )}
                </Container>
                <Footer />
            </main>
        </ThemeProvider>
    );
}