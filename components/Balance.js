import { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Balance() {
  const [, regenerateRadomData] = useState();
  const forceUpdate = useCallback(() => regenerateRadomData({}), []);

  const data = [
    0,
    25 + Math.random() * 25,
    50 + Math.random() * 25,
    75 + Math.random() * 25,
    75 + Math.random() * 25,
    100 + Math.random() * 25,
    100 + Math.random() * 25,
    120 + Math.random() * 25,
    130 + Math.random() * 25,
    150 + Math.random() * 25,
  ];

  return (
    <Pressable style={styles.container} onPress={forceUpdate}>
      <View style={styles.layout}>
        <View>
          <Text style={styles.title}>Card balance</Text>
          <Text style={styles.balance}>
            ${(Math.random() * 1000).toFixed(2)}
          </Text>
        </View>
        <LineChart
          data={{
            datasets: [
              {
                data,
              },
            ],
          }}
          width={Dimensions.get('window').width / 2 - 24}
          height={80}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            fillShadowGradientFrom: '#fff',
            fillShadowGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 200, 200, ${opacity * 2})`,
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
          }}
          hidePointsAtIndex={[...Array(data.length - 1).keys()]}
          withHorizontalLabels={false}
          bezier
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: Platform.select({
      native: 12,
    }),
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#666',
    marginBottom: 6,
  },
  balance: {
    fontSize: 28,
    fontWeight: '600',
  },
});
