import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useGetPrayerRequest } from '../hooks/useGetPrayerRequest';
import PROutput from '../components/PrayerRequests/PROutput';

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
          if (result.data && Array.isArray(result.data.prayerRequests)) {
            setPrayerRequests(result.data.prayerRequests);
          } else {
            setError('Received data in unexpected format');
          }
        } else {
          setError(result ? result.error.message : 'Unknown error');
        }
      } catch (err) {
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
   <PROutput prayerRequests={prayerRequests} />
  );
}

export default PrayerRequestsScreen;