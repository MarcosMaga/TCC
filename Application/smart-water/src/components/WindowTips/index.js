import React from "react";
import { View, Text } from "react-native";

import CustomIcon from "../CustomIcon/index";
import styles from "./style";

function WindowTips(props){
    const [tip, setTip] = React.useState("Seu consumo está baixo!");

    const tips = {
        verylow: [ // 50 - 149
            "Seu consumo de água é como tomar um banho de 15 minutos.",
            "Você usou água suficiente para encher uma banheira.",
            "Seu consumo é maior que o consumo díario de um aluno em uma escola.",
            "Seu consumo de água poderia regar um jardim."
        ],
        low: [ //150 - 499
            "Seu uso de água da para lavar suas roupas para a semana.",
            "Seu consumo poderia fazer café para 2 pessoas por um ano.",
            "O seu uso é equivalente a lavagem de um carro em um lava-rápido.",
            "Seu consumo ultrapassa o recomendado para manter uma pessoa por um dia."
        ],
        normal: [ //500 - 999
            "Seu consumo de água poderia encher em média 5 hidromassagens.",
            "O seu uso de água é o mesmo de regar um jardim por 30 minutos.",
            "Seu consumo de água poderia ser usado para 45 pessoas usarem o banheiro.",
            "Seu consumo é maior que o que um homem brasileiro bebe por 250 dias."
        ],
        medium: [ // 1000 - 1999
            "O seu consumo poderia encher uma piscina infantil grande.",
            "O uso de água poderia encher mais de 2500 copos de água.",
            "Você usou água o suficiente para encher uma caixa d'agua de 1,5m de diametro.",
            "Seu uso de água poderia sustentar um cachorro de porte média por 2 anos."
        ],
        high: [ // 2000 - 3099
            "O seu consumo daria para 16 pessoas lavarem suas roupas.",
            "Você usou água suficiente para 30 vacas adultas tomarem.",
            "Seu consumo é o suficiente para 2 mil pessoas escovarem os dentes.",
            "Com o seu consumo é possível para usar a máquina de lavar louça 200 vezes."
        ]
    }

    React.useState(() => {
        if(props.consumption >= 50 && props.consumption < 150)
            setTip(tips.verylow[Math.floor(Math.random() * tips.verylow.length)]);
        else if(props.consumption >= 150 && props.consumption < 500)
            setTip(tips.low[Math.floor(Math.random() * tips.low.length)]);
        else if(props.consumption >= 500 && props.consumption < 1000)
            setTip(tips.normal[Math.floor(Math.random() * tips.normal.length)]);
        else if(props.consumption >= 1000 && props.consumption < 2000)
            setTip(tips.medium[Math.floor(Math.random() * tips.medium.length)]);
        else if(props.consumption >= 2000 && props.consumption < 3100)
            setTip(tips.high[Math.floor(Math.random() * tips.high.length)]);
        else if(props.consumption >= 3100)
            setTip("Seu consumo ultrapassou o recomendado mensal pela OMS.");
        else
            setTip("Seu consumo está otimo!");

    }, [props.consumption])


    return(
        <View style={styles.container}>
            <View style={styles.lamp}>
                <CustomIcon type="FontAwesome" name="lightbulb-o" color="#0099FF" size={45}/>
            </View>
            <Text style={styles.tips}>{`${tip} Clique para economizar.`}</Text>
        </View>
    );
}

export default WindowTips;