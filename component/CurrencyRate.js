import { useCurrencyStore } from "../hooks/useCurrencyStore";
import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CurrencyRate = () => {
  const { rates = [], fetchRates } = useCurrencyStore();

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);

    return () => clearInterval(interval);
  }, [fetchRates]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.country}>{item.name}</Text>
      <Text style={styles.currency}>Code: {item.code}</Text>
      <Text style={styles.rate}>Rate: {item.rate}</Text>
      <Text style={styles.date}>Last updated: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Conversion Rates</Text>
      {rates.length > 0 ? (
        <FlatList
          data={rates}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          style={styles.list}
        />
      ) : (
        <Text>Loading rates...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  country: {
    color: "#fff",
    fontSize: 18,
  },
  currency: {
    color: "#ccc",
  },
  rate: {
    color: "#fff",
  },
  date: {
    color: "#ccc",
  },
});
export default CurrencyRate;
