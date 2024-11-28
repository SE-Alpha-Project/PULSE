import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer"; // Assuming you have a Footer component

const defaultTheme = createTheme();

export default function Resources(props) {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Handle search operation
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResults([]);

        try {
            const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key
            const CX = "YOUR_CX"; // Replace with your Custom Search Engine ID

            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(searchQuery)}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            setSearchResults(data.items || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            News & Blogs
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Discover a wealth of articles, blogs, and news dedicated to helping you achieve your wellness goals. Stay informed with the latest tips, workouts, nutrition advice, and wellness insights that can help you live a healthier life.
                        </Typography>
                    </Container>
                </Box>

                <Container>
                    {/* Search Section */}
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            variant="outlined"
                            label="Search Articles"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ flexGrow: 1 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ ml: 2 }}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Show loading spinner or error message */}
                    {loading && <Typography variant="h6" color="text.secondary">Loading...</Typography>}
                    {error && <Typography variant="h6" color="error">{error}</Typography>}

                    {/* Search Results */}
                    <Grid container spacing={4}>
                        {searchResults.map((result, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <div>
                                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                                        <h3>{result.title}</h3>
                                    </a>

                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.description || article.summary}  {/* Use appropriate field */}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Published on: {new Date(article.publishedAt).toLocaleDateString()}  {/* Format date */}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid> 
                {visibleCount < resources.length && (
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
                <Footer/>

            </main>
        </ThemeProvider>
    );
}
