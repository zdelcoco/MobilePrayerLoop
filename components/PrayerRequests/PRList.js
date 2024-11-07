import React from 'react';
import { FlatList } from 'react-native';

import PRItem from './PRItem';

function renderPRItem({ item }) {
  return <PRItem {...item} />;
}

function PRList({ prayerRequests }) {
  return (
    <FlatList
      data={prayerRequests}
      renderItem={renderPRItem}
      keyExtractor={(item) => item.Prayer_Request_ID.toString()}
    />
  );
}

export default PRList;