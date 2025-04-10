import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ 
  property, 
  elevation = 1,
  variant = 'default', // 'default' or 'compact'
  showActions = true 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const imageHeight = variant === 'compact' ? 200 : 200;
  const padding = variant === 'compact' ? 2 : 3;
  const priceSize = variant === 'compact' ? '1.25rem' : '1.5rem';

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        width: '100%',
        minWidth: 300,
        maxWidth: variant === 'compact' ? 400 : 'none',
        height: '100%',
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
      }}
      elevation={elevation}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={property.image}
          alt={property.address}
          sx={{
            width: '100%',
            height: imageHeight,
            objectFit: 'cover',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        />
        {/* {property.comingSoon && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: '#067741',
              color: 'white',
              px: 2,
              py: 0.75,
              borderRadius: 20,
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(6,119,65,0.3)',
              zIndex: 1,
            }}
          >
            Coming Soon
          </Box>
        )} */}
        {showActions && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={(e) => e.stopPropagation()}
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                },
                width: 36,
                height: 36,
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 20, color: '#222' }} />
            </IconButton>
            <IconButton
              onClick={(e) => e.stopPropagation()}
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                },
                width: 36,
                height: 36,
              }}
            >
              <ShareIcon sx={{ fontSize: 20, color: '#222' }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: padding }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            color: '#222',
            mb: 2,
            fontSize: priceSize,
          }}
        >
          ${property?.price?.toLocaleString()}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 }, 
            mb: 2,
            color: '#666',
            fontSize: '0.875rem',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
            <Typography sx={{ fontWeight: 600 }}>
              {property.beds}
            </Typography>
            <Typography sx={{ ml: 0.5 }}>beds</Typography>
          </Box>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>•</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
            <Typography sx={{ fontWeight: 600 }}>
              {property.baths}
            </Typography>
            <Typography sx={{ ml: 0.5 }}>baths</Typography>
          </Box>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>•</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
            <Typography sx={{ fontWeight: 600 }}>
              {property.sqft.toLocaleString()}
            </Typography>
            <Typography sx={{ ml: 0.5 }}>sq ft</Typography>
          </Box>
        </Box>

        <Typography 
          sx={{
            color: '#444',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {property.address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;