import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../button';

interface FooterListProps {
  onPress: () => void;
  hidden: boolean;
}

const FooterList = (props: FooterListProps) => {
  return (
    <View style={[styles.container,{display:props.hidden ? "none" : "flex"}]}>
      <Button
        label='Submit'
        onPress={props.onPress}
      />
    </View>
  );
};

export default FooterList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 20
  }
});