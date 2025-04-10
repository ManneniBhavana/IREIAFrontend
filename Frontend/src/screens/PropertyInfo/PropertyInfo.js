// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Grid
// } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';
// import Header from '../../components/Header';
// import { Slider } from '@mui/material';
// import { useState } from 'react';
// import PropertyCard from '../../components/PropertyCard';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


// const PropertyInfo = () => {
//   const location = useLocation();
//   const property = location?.state;
//   const baseRent = (property?.rental_estimate || Math.round((property?.estimate?.estimate || 300000) * 0.0045));
//   const [adjustedRent, setAdjustedRent] = useState(baseRent);

// if (!property) {
//   return (
//     <Container>
//       <Typography variant="h6" sx={{ mt: 4 }}>
//         No property data found.
//       </Typography>
//     </Container>
//   );
// }

//   // Generate fake trend data from mock property
//   const generatePriceTrendData = (property) => {
//     const soldPrice = property?.last_sold_price;
//     const estimate = property?.estimate?.estimate;
//     const listPrice = property?.list_price;
//     if (soldPrice && estimate && listPrice) {
//       return [
//         { date: '2020', value: soldPrice * 0.95 },
//         { date: '2021', value: soldPrice },
//         { date: '2022', value: estimate },
//         { date: '2023', value: estimate * 1.03 },
//         { date: '2024', value: listPrice }
//       ];
//     }
//     return [];
//   };

//   const priceTrendData = generatePriceTrendData(property);

//   // Map Code
//   const MapComponent = ({ center, nearbyProperties = [] }) => {
//     const { isLoaded, loadError } = useLoadScript({
//       googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
//     });
    
//     const mapContainerStyle = {
//       width: '100%',
//       height: '400px',
//       borderRadius: 8,
//       marginTop: 16
//     };

//     const defaultCenter = { lat: 37.7749, lng: -122.4194 };

//     const mainCoordinates = center?.lat && center?.lng ? center : defaultCenter;
//     console.log("Main Property Coordinates: ",mainCoordinates, "NEARBY PROEPRTIES", nearbyProperties)
    
//     const validNearby = nearbyProperties.filter(
//       (prop) =>
//         prop?.location?.address?.coordinate?.lat &&
//         prop?.location?.address?.coordinate?.lon
//     );
//     if (loadError) return <Typography color="error">Map failed to load</Typography>;
//     if (!isLoaded) return <Typography>Loading map...</Typography>;
  
//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={mainCoordinates}
//         zoom={13}
//         options={{
//           disableDefaultUI: true,
//           zoomControl: true,
//           scrollwheel: false
//         }}
//       >
//       {/* Main Property - Green Pin */}
//       <Marker
//         position={center}
//         icon={{
//           url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//         }}
//       />
//       {/* Nearby Properties - Red Pins */}
//       {nearbyProperties.map((prop, index) => {
//           const coords = prop?.location?.address?.coordinate;
//           if (!coords?.lat || !coords?.lon) return null;

//           const price = prop?.list_price || prop?.estimate?.estimate || 0;
//           const formattedPrice = price >= 1000000
//             ? `$${(price / 1000000).toFixed(2)}M`
//             : `$${Math.round(price / 1000)}K`;

//           return (
//             <Marker
//               key={index}
//               position={{ lat: coords.lat, lng: coords.lon }}
//               label={{
//                 text: formattedPrice,
//                 fontSize: '12px',
//                 fontWeight: 'bold',
//                 color: 'white'
//               }}
//               icon={window.google?.maps?.SymbolPath
//                 ? {
//                     path: window.google.maps.SymbolPath.CIRCLE,
//                     fillColor: '#c82021',
//                     fillOpacity: 1,
//                     strokeWeight: 0,
//                     scale: 18
//                   }
//                 : undefined}
//             />
//           );
//         })}
//       </GoogleMap>
//     );
//   };

//   const allProperties = location?.state?.allProperties || []; // sent from SearchBar or PropertyListings
//   const currentPropertyId = property?.property_id;
  
//   // Filter out the current property and keep the rest as nearby
//   const nearbyProperties = allProperties.filter(
//     (p) => p?.property_id !== currentPropertyId
//   );


//   return (
//     <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
//       <Header />
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Image and Basic Info */}
//         <Card sx={{ mb: 4 }}>
//           <Box
//             component="img"
//             src={property?.primary_photo?.href || '/genbcs-24082644-0-jpg.png'}
//             alt="Property"
//             sx={{ width: '100%', height: 400, objectFit: 'cover' }}
//           />
//           <CardContent>
//             <Typography variant="h4" fontWeight="bold" gutterBottom>
//               ${property?.list_price?.toLocaleString() || 'Not Available'}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 1 }}>
//               {property?.location?.address?.line}, {property?.location?.address?.city}, {property?.location?.address?.state}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               {property?.description?.beds || 0} beds • {property?.description?.baths || 0} baths • {property?.description?.sqft?.toLocaleString() || '-'} sqft
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* About this home */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             About this home
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             {property?.description?.text || "Details about this property are currently unavailable. Check back later for more insights."}
//           </Typography>
//         </Box>

//         {/* Price Trend Graph */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Price Estimate Trend
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Historical price estimate for this property over time
//           </Typography>

//           {priceTrendData?.length ? (
//             <Box sx={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={priceTrendData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                   <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
//                   <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
//                   <Tooltip
//                     formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
//                     contentStyle={{
//                       backgroundColor: '#fff',
//                       border: 'none',
//                       borderRadius: 8,
//                       boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#c82021"
//                     strokeWidth={2}
//                     dot={{ fill: '#c82021' }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Box>
//           ) : (
//             <Typography color="text.secondary">Price trend data is not available.</Typography>
//           )}
//         </Box>

//         {/* Predicted Rental Income */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Predicted Rental Income
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Based on location, property size, and local rent averages
//           </Typography>

//           <Box
//             sx={{
//               backgroundColor: '#e8f5e9',
//               p: 3,
//               borderRadius: 2,
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//               display: 'inline-block'
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#2e7d32',
//                 textAlign: 'center'
//               }}
//             >
//               ${baseRent} / month
//             </Typography>
//           </Box>
//         </Box>
//         {/* Adjustable Rental Income */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Adjustable Rental Income
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Use the slider to simulate different rental pricing scenarios
//           </Typography>

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 3,
//               bgcolor: '#fffbea',
//               p: 3,
//               borderRadius: 2,
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#c82021',
//                 textAlign: 'left'
//               }}
//             >
//               ${adjustedRent} / month
//             </Typography>

//             <Slider
//               value={adjustedRent}
//               min={baseRent * 0.5}
//               max={Math.ceil(baseRent * 1.5)}
//               step={50}
//               onChange={(_, val) => setAdjustedRent(val)}
//               valueLabelDisplay="auto"
//               valueLabelFormat={(value) => `$${value}`}
//               sx={{
//                 color: '#c82021',
//                 width: '100%',
//                 maxWidth: '500px'
//               }}
//             />

//             <Typography
//               variant="caption"
//               color="text.secondary"
//               sx={{ textAlign: 'center' }}
//             >
//               Adjust the estimated rental income based on your assumptions
//             </Typography>
//           </Box>
//         </Box>
//         {/* Market Positioning */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Market Positioning
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             See where your adjusted rent stands in comparison to estimated market rates
//           </Typography>

//           {/* Dynamic Bar */}
//           <Box
//             sx={{
//               position: 'relative',
//               height: 10,
//               borderRadius: 5,
//               background: 'linear-gradient(to right, #c8e6c9, #fff59d, #ffcdd2)',
//               mb: 4,
//               mt: 4
//             }}
//           >
//             {/* Marker */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: 20,
//                 height: 20,
//                 borderRadius: '50%',
//                 backgroundColor: '#c82021',
//                 border: '3px solid white',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
//                 left: `${Math.min(100, Math.max(0, ((adjustedRent - baseRent) / baseRent) * 50 + 50))}%`,
//                 transition: 'left 0.3s ease'
//               }}
//             />
//           </Box>

//           {/* Price Labels */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: 1 }}>
//             <Typography variant="caption" color="text.secondary">
//               ${Math.round(baseRent * 0.8)} (Below)
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               ${baseRent} (Market)
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               ${Math.round(baseRent * 1.2)} (Above)
//             </Typography>
//           </Box>

//           {/* Text Labels */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="caption" color="text.secondary">Below Market</Typography>
//             <Typography variant="caption" color="text.secondary">Market Rate</Typography>
//             <Typography variant="caption" color="text.secondary">Above Market</Typography>
//           </Box>
//         </Box>
//         {/* Map Section */}
//         <Box sx={{ mb: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Location on Map
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Explore where this property is located
//           </Typography>
//           <MapComponent
//             center={{
//               lat: property?.location?.address?.coordinate?.lat,
//               lng: property?.location?.address?.coordinate?.lon
//             }}
//             nearbyProperties={nearbyProperties}
//           />
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default PropertyInfo;

// --- At the top ---
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box, Typography, Container, Card, CardContent, Slider
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Header from '../../components/Header';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// --- Component Start ---
const PropertyInfo = () => {
  const location = useLocation();
  const property = location?.state;
  const allProperties = location?.state?.allProperties || [];
  const currentPropertyId = property?.property_id;

  const baseRent = property?.rental_estimate || Math.round((property?.estimate?.estimate || 300000) * 0.0045);
  const [adjustedRent, setAdjustedRent] = useState(baseRent);

  const priceTrendData = generatePriceTrendData(property);

  const nearbyProperties = allProperties.filter(
    (p) => p?.property_id !== currentPropertyId &&
    p?.location?.address?.coordinate?.lat && p?.location?.address?.coordinate?.lon
  );

  if (!property) {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>No property data found.</Typography>
      </Container>
    );
  }

  function generatePriceTrendData(property) {
    const soldPrice = property?.last_sold_price;
    const estimate = property?.estimate?.estimate;
    const listPrice = property?.list_price;
    if (soldPrice && estimate && listPrice) {
      return [
        { date: '2020', value: soldPrice * 0.95 },
        { date: '2021', value: soldPrice },
        { date: '2022', value: estimate },
        { date: '2023', value: estimate * 1.03 },
        { date: '2024', value: listPrice }
      ];
    }
    return [];
  }

  // --- Map Component ---
  const MapComponent = ({ center, nearbyProperties = [] }) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const mapContainerStyle = {
      width: '100%',
      height: '400px',
      borderRadius: 8,
      marginTop: 16
    };

    if (loadError) return <Typography color="error">Map failed to load</Typography>;
    if (!isLoaded) return <Typography>Loading map...</Typography>;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={{ disableDefaultUI: true, zoomControl: true, scrollwheel: false }}
      >
        {/* Main Property Pin */}
        <Marker
          position={center}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
        />

        {/* Nearby Pins */}
        {nearbyProperties.map((prop, index) => {
          const coords = prop?.location?.address?.coordinate;
          const price = prop?.list_price || prop?.estimate?.estimate || 0;
          const formattedPrice = price >= 1000000
            ? `$${(price / 1000000).toFixed(2)}M`
            : `$${Math.round(price / 1000)}K`;

          return (
            <Marker
              key={index}
              position={{ lat: coords.lat, lng: coords.lon }}
              label={{
                text: formattedPrice,
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white'
              }}
              icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                // fillColor: '#c82021',
                // fillOpacity: 1,
                // strokeWeight: 0,
                // scale: 18
              }}
            />
          );
        })}
      </GoogleMap>
    );
  };

  const coordinates = {
    lat: property?.location?.address?.coordinate?.lat || 37.7749,
    lng: property?.location?.address?.coordinate?.lon || -122.4194
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Basic Info */}
        <Card sx={{ mb: 4 }}>
          <Box
            component="img"
            src={property?.primary_photo?.href || '/genbcs-24082644-0-jpg.png'}
            alt="Property"
            sx={{ width: '100%', height: 400, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ${property?.list_price?.toLocaleString() || 'Not Available'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {property?.location?.address?.line}, {property?.location?.address?.city}, {property?.location?.address?.state}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {property?.description?.beds || 0} beds • {property?.description?.baths || 0} baths • {property?.description?.sqft?.toLocaleString() || '-'} sqft
            </Typography>
          </CardContent>
        </Card>

        {/* About This Home */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>About this home</Typography>
          <Typography variant="body1" color="text.secondary">
            {property?.description?.text || "Details about this property are currently unavailable."}
          </Typography>
        </Box>

        {/* Price Graph */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Price Estimate Trend</Typography>
          {priceTrendData.length ? (
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Price']} />
                  <Line type="monotone" dataKey="value" stroke="#c82021" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Typography>No trend data available.</Typography>
          )}
        </Box>

        {/* Predicted Rental Income */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Predicted Rental Income</Typography>
          <Box sx={{ bgcolor: '#e8f5e9', p: 3, borderRadius: 2, display: 'inline-block' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              ${baseRent} / month
            </Typography>
          </Box>
        </Box>

        {/* Adjustable Rent */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold">Adjustable Rental Income</Typography>
          <Slider
            value={adjustedRent}
            min={baseRent * 0.5}
            max={Math.ceil(baseRent * 1.5)}
            step={50}
            onChange={(_, val) => setAdjustedRent(val)}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => `$${val}`}
            sx={{ maxWidth: 500, color: '#c82021' }}
          />
        </Box>

        {/* Market Positioning */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold">Market Positioning</Typography>
          <Box sx={{ position: 'relative', height: 10, borderRadius: 5, background: 'linear-gradient(to right, #c8e6c9, #fff59d, #ffcdd2)', mt: 2, mb: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 20, height: 20, borderRadius: '50%',
                backgroundColor: '#c82021',
                left: `${Math.min(100, Math.max(0, ((adjustedRent - baseRent) / baseRent) * 50 + 50))}%`
              }}
            />
          </Box>
        </Box>

        {/* Map Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold">Location on Map</Typography>
          <MapComponent center={coordinates} nearbyProperties={nearbyProperties} />
        </Box>
      </Container>
    </Box>
  );
};

export default PropertyInfo;