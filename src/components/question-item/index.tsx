import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import {
    Card,
    RadioButton,
    Text,
    useTheme
} from 'react-native-paper';
import useStoreQuestion from '@/stores/useStoreQuestion';

interface QuestionItemProps {
    item: IQuestion & { id: string; };
}

const QuestionItem = ({
    item
}: QuestionItemProps) => {
    const {
        id,
        question,
        correctAnswer,
        chooses
    } = item;
    const { onSelect, findAnswers } = useStoreQuestion();
    const asnwer = findAnswers(id);

    const theme = useTheme();
    function renderRadio() {
        return chooses.map((v, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', width: "100%", height: 50 }}>
                <TouchableOpacity
                    style={[{ flexDirection: 'row' }]}
                    onPress={() => { }}>
                    <RadioButton.Android
                        uncheckedColor={theme.colors.inversePrimary}
                        color={theme.colors.inversePrimary}
                        value={v}
                        status={
                            v === asnwer?.asnwer ? 'checked' : 'unchecked'
                        }
                    />
                </TouchableOpacity>
                <Text>{v}</Text>
            </View>
        ));

    }
    return (
        <View style={{
            paddingTop: 20,
            paddingHorizontal: 20
        }}>
            <Card>
                <Card.Content>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>{id}. {question}</Text>
                    </View>
                    <View style={{
                        paddingTop: 16
                    }}>
                        <RadioButton.Group onValueChange={(v) => onSelect(v, id, correctAnswer)} value={asnwer?.asnwer!}>
                            {renderRadio()}
                        </RadioButton.Group>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );


};

export default QuestionItem;

