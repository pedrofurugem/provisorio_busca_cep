import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api'
//useRef abrir teclado com a referencia se ele limpou
export default function app(){
    const [cep, setCep] = useState('')
    const inputRef = useRef(null)
    const [cepUser, setCepUser] = useState(null) //pegar o cep do user
    //null e '' podem ser a mesma coisa?
    async function buscar(){
        if(cep == ''){
            alert('Digite um cep')
            setCep('')
            return; //return para ele não continua
        }

        //tratamento de erros
        try{
          const response = await api.get(`/${cep}/json`)
          console.log(response.data)
          setCepUser(response.data)
          Keyboard.dismiss() //garantir o fechamento do teclado
        }catch(error){
          console.log('ERROR: ' + error)
        }
        
    }

    function limpar(){
        setCep('')
        inputRef.current.focus() //teclado não clicavel ao entrar
        setCepUser(null)
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center'}}>
                <Text style={styles.text}>Digite o Cep desejado</Text>
                <TextInput 
                  style={styles.input}
                  placeholder='CEP'
                  value={cep}
                  onChangeText={ (text)=> setCep(text)}
                  keyboardType="numeric"
                  ref={inputRef}
                />  
            </View>
            <View style={styles.areaBtn}>
                <TouchableOpacity style={[styles.botao, { backgroundColor:'#1d75cd'} ]}
                onPress={ buscar }
                >
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={[styles.botao, { backgroundColor:'#cd3e1d'}]}
                onPress={limpar}
                >
                    <Text style={styles.botaoText}>Limpar</Text>
                </TouchableOpacity>
            </View>

            { cepUser && 
            <View style={styles.resultado}>
                <Text style={styles.cepItem}>CEP: {cepUser.cep}</Text>
                <Text style={styles.cepItem}>Logradouro: {cepUser.logradouro}</Text>
                <Text style={styles.cepItem}>Bairro: {cepUser.bairro}</Text>
                <Text style={styles.cepItem}>Cidade: {cepUser.localidade} </Text>
                <Text style={styles.cepItem}>Estado: {cepUser.uf} </Text>
            </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
       backgroundColor: '#FFF',
       borderWidth: 1,
       borderColor: '#DDD',
       borderRadius: 5,
       width: '90%',
       padding: 10,
       fontSize: 18,
    },
    areaBtn: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15,
    },
    botao: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
    },
    botaoText: {
        fontSize: 15,
        color: '#FFF',
        fontWeight: 'bold'
    },
    resultado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cepItem: {
        fontSize: 22
    }
})