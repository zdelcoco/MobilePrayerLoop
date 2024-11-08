import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPrayerRequests,
  fetchPrayerRequests,
} from '../store/prayerRequestSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import PROutput from '../components/PrayerRequests/PROutput';

function PrayerRequestsScreen() {
  const dispatch = useDispatch();
  const { prayerRequests, status, error } = useSelector(selectPrayerRequests);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPrayerRequests());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <LoadingOverlay message='Loading prayer requests...' />;
  }

  if (status === 'failed') {
    return <Text style={styles.errorText}>Error: {error?.message || 'Unknown error'}</Text>;
  }

  const transformedPrayerRequests = Array.isArray(prayerRequests) 
    ? prayerRequests 
    : prayerRequests?.prayerRequests || [];

  return (
    <PROutput prayerRequests={transformedPrayerRequests} />
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PrayerRequestsScreen;