

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchBar = ({ performSearch }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);


//   const handleSearch = async () => {
//     if (!searchTerm) return;
//     setLoading(true);
  
//     const results = performSearch(searchTerm);
//     setLoading(false);
  
//     if (!results || results.length === 0) {
//       alert("No property found.");
//     } else if (results.length === 1) {
//       navigate('/property-info', { state: results[0] });
//     } else {
//       navigate('/property-listings', { state: results });
//     }
//   };

//   return (
//     <Box sx={{ position: 'relative', width: '100%' }}>
//       <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//         <TextField
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSearch();
//           }}
//           placeholder="Enter an address, neighborhood, city, or ZIP code"
//           variant="outlined"
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               color: 'white',
//               '& fieldset': {
//                 borderColor: 'rgba(255, 255, 255, 0.5)',
//               },
//               '&:hover fieldset': {
//                 borderColor: 'white',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: 'white',
//               },
//             },
//             '& .MuiInputBase-input::placeholder': {
//               color: 'rgba(255, 255, 255, 0.7)',
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={loading}
//           sx={{ bgcolor: '#c82021', minWidth: 'auto', px: 2 }}
//         >
//           <SearchIcon />
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default SearchBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import mockData from '../../data/data.json'; // your local fallback dataset

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    const matches = performSearch(searchTerm);
    if (matches.length === 1) {
      navigate('/property-info', { state: matches[0] });
    } else if (matches.length > 1) {
      navigate('/property-listings', { state: matches });
    } else {
      alert('No matching properties found.');
    }
  };

  const performSearch = (input) => {
    const term = input.toLowerCase();
    return mockData.data?.home_search?.results?.filter((item) => {
      const address = item?.location?.address;
      return (
        address?.line?.toLowerCase().includes(term) ||
        address?.city?.toLowerCase().includes(term) ||
        address?.state?.toLowerCase().includes(term) ||
        address?.postal_code?.toLowerCase().includes(term)
      );
    }) || [];
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setAnchorEl(e.currentTarget);

    if (value.length > 2) {
      const results = performSearch(value);
      setSuggestions(results.slice(0, 5)); // Top 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item?.location?.address?.line || '');
    setSuggestions([]);
    navigate('/property-info', { state: item });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ bgcolor: '#c82021', minWidth: 'auto', px: 2 }}
        >
          <SearchIcon />
        </Button>
      </Box>

      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            zIndex: 10,
            width: anchorEl?.offsetWidth || '100%',
            mt: -1,
            bgcolor: '#ffffff',
            color: '#000000',
            maxHeight: 250,
            overflowY: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <List dense>
            {suggestions.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSuggestionClick(item)}
                sx={{
                  '&:hover': { backgroundColor: '#f2f2f2' },
                }}
              >
                <ListItemText
                  primary={item?.location?.address?.line || 'No address'}
                  secondary={`${item?.location?.address?.city}, ${item?.location?.address?.state} ${item?.location?.address?.postal_code}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;