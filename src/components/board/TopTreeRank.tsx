import React from 'react';
import {
    View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import RankOne from './RankOne';
import RankThree from './RankThree';
import RankTwo from './RankTwo';
import { createStyle } from './styles';
interface TopTreeRankProps {
    boards: (IBoard | undefined)[];
}
export interface RankProps {
    playerName: string;
    score: number;
}
export default function TopTreeRank({
    boards
}: TopTreeRankProps) {
    const theme = useTheme();
    const styles = createStyle(theme);
    return (
        <View style={styles.container}>
            {/* Two */}
            <RankTwo playerName={boards[0] ? boards[0].playerName : ""} score={boards[0] ? boards[0].score : 0} />
            {/* One */}
            <RankOne playerName={boards[1] ? boards[1].playerName : ""} score={boards[1] ? boards[1].score : 0} />
            {/* Tree */}
            <RankThree playerName={boards[2] ? boards[2].playerName : ""} score={boards[2] ? boards[2].score : 0} />
        </View>
    );
}


