import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 10,
  },
  amount: {
    fontWeight: 'bold',
  },
});

const PDFContent = ({ paymentArray }) => {
  return (
    <View>
      {paymentArray.map((paymentDetail, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.paymentName}>
            Payment Name: {paymentDetail.paymentname}
          </Text>
          <View style={styles.list}>
            {paymentDetail.payees.map((payee, index) => (
              <Text key={index} style={styles.listItem}>
                {payee.name} <> -------> </> {paymentDetail.payer} : Rs{' '}
                <Text style={styles.amount}>{paymentDetail.amount}</Text>
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default PDFContent;