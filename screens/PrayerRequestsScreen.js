import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useGetPrayerRequest } from '../hooks/useGetPrayerRequest';

function PrayerRequestsScreen() {
  const getPRs = useGetPrayerRequest();
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPrayerRequests() {
      try {
        setIsLoading(true);
        const result = await getPRs();
        if (result && result.success) {
          console.log('Received data:', result.data);          
          if (result.data && Array.isArray(result.data.prayerRequests)) {
            setPrayerRequests(result.data.prayerRequests);
          } else {
            console.log('Unexpected data structure:', result.data);
            setError('Received data in unexpected format');
          }
        } else {
          console.log(result ? result.error.message : 'Unknown error');
          setError(result ? result.error.message : 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching prayer requests:', err);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrayerRequests();
  }, []); 

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!prayerRequests || prayerRequests.length === 0) {
    return <Text>No prayer requests found</Text>;
  }

  return (
    <ScrollView>
      <Text>Prayer Requests</Text>
      {prayerRequests.map((pr, index) => (
        <View key={index}>
          <Text>Title: {pr.Title}</Text>
          <Text>Description: {pr.Description}</Text>
          {/* Add more fields as needed */}
        </View>
      ))}
    </ScrollView>
  );
}

export default PrayerRequestsScreen;