import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import { ObjectI } from "../App";
import Button from "./Button";
import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constants/styles";

// interface Inputs {
//   amount: {
//     value: string;
//     isValid: boolean;
//   };
//   date: {
//     value: string;
//     isValid: boolean;
//   };
//   description: {
//     value: string;
//     isValid: boolean;
//   };
// }
interface Inputs {
  amount: ObjectI;
  date: ObjectI;
  description: ObjectI;
}

function ExpenseForm(
  this: Global,
  {
    submitButtonLabel,
    onCancel,
    onSubmit,
    defaultValues,
  }: { submitButtonLabel: string; onCancel: () => void; onSubmit: (arg0: ObjectI) => void; defaultValues: ObjectI }
): JSX.Element {
  // console.log("this:", this, typeof this);

  const [inputs, setInputs] = React.useState<Inputs>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date as Date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? (defaultValues.description as string) : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string): void {
    setInputs((curInputs: Inputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler(): void {
    const expenseData = {
      amount: +inputs.amount.value as number,
      date: new Date(inputs.date.value as string) as Date,
      description: inputs.description.value as string,
    };

    const amountIsValid: boolean = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid: boolean = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid: boolean = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs: Inputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid: boolean = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
