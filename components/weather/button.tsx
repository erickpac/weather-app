import { StyleSheet, Text, Pressable } from "react-native";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
};

export const WeatherButton = ({ title, disabled, onPress }: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: "black",
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  textColor: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
