import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Terms_Conditions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.lastModified}>Last Modified: 1/4/2024</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ipsum sapien. Ut consectetur nisl
          id mauris eleifend, ac convallis ligula tristique. Nulla facilisi. Suspendisse potenti. Quisque
          venenatis luctus urna vel euismod. Aenean vel dui sed lacus efficitur congue. Maecenas eu aliquet
          urna. Suspendisse in est a ligula lacinia gravida vel et nibh. Vestibulum dignissim tortor eget
          tellus malesuada, sit amet eleifend velit faucibus. Phasellus interdum lectus vel tortor blandit
          fringilla. Proin eu metus nec tortor facilisis luctus.
        </Text>
        <Text style={styles.text1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ipsum sapien. Ut consectetur nisl
          id mauris eleifend, ac convallis ligula tristique. Nulla facilisi. Suspendisse potenti. Quisque
          venenatis luctus urna vel euismod. Aenean vel dui sed lacus efficitur congue. Maecenas eu aliquet
          urna. Suspendisse in est a ligula lacinia gravida vel et nibh. Vestibulum dignissim tortor eget
          tellus malesuada, sit amet eleifend velit faucibus. Phasellus interdum lectus vel tortor blandit
          fringilla. Proin eu metus nec tortor facilisis luctus.
        </Text>
        <Text style={styles.text2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ipsum sapien. Ut consectetur nisl
          id mauris eleifend, ac convallis ligula tristique. Nulla facilisi. Suspendisse potenti. Quisque
          venenatis luctus urna vel euismod. Aenean vel dui sed lacus efficitur congue. Maecenas eu aliquet
          urna. Suspendisse in est a ligula lacinia gravida vel et nibh. Vestibulum dignissim tortor eget
          tellus malesuada, sit amet eleifend velit faucibus. Phasellus interdum lectus vel tortor blandit
          fringilla. Proin eu metus nec tortor facilisis luctus.
        </Text>
        <Text style={styles.text3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ipsum sapien. Ut consectetur nisl
          id mauris eleifend, ac convallis ligula tristique. Nulla facilisi. Suspendisse potenti. Quisque
          venenatis luctus urna vel euismod. Aenean vel dui sed lacus efficitur congue. Maecenas eu aliquet
          urna. Suspendisse in est a ligula lacinia gravida vel et nibh. Vestibulum dignissim tortor eget
          tellus malesuada, sit amet eleifend velit faucibus. Phasellus interdum lectus vel tortor blandit
          fringilla. Proin eu metus nec tortor facilisis luctus.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lastModified: {
    fontSize: 26,
    top: 40,
    fontWeight: 'bold',
    marginBottom: 100,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
  text1: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
  text2: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
  text3: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default Terms_Conditions;
