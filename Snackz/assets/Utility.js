import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'

export default class Utility {
    static sinstance = Utility.sinstance == null ? new Utility() : this.sinstance


    

    async getItemForKey(key) {
        try {
            const fatchedValue = await AsyncStorage.getItem(key)
            console.log('11111---->' + fatchedValue)
            console.log('2222222---->' + JSON.parse(fatchedValue))
            if (fatchedValue !== null) {
                var parsedData = JSON.parse(fatchedValue);
                return parsedData
            }
        } catch (error) {
            throw new error('could not get data due to error');
            console.log(error)
        }

    }


    async getLastSession(mSessionId) {
        return this.getItemForKey(mSessionId)
    }

    async saveUser(email, data) {
        
        try {
            let userDataX = await this.setItemForKey(email, data)
            if (userDataX) {
                console.log("<<" + userDataX)
                console.log("<<<<" + JSON.stringify(data))
                this.userData = JSON.parse(JSON.stringify(data));
                this.userData = data;
                console.log(JSON.stringify(this.userData) + '1111111')
            }
        } catch (error) {
            return false;
        }
    }


    async getUser(email) {
        try {
            
            let mUser = await this.getItemForKey(email);
             return mUser   

        } catch (error) {
            return false;
        }
    }


    async setSession(email, data) {
        
        try {
            
                     
            let userDataX = await this.setItemForKey(email+"_session", data)
            if (userDataX) {
                console.log("<<<<" + JSON.stringify(data))                
            }
        } catch (error) {
            return false;
        }
    }

    async getSession(email){
        let sesion = await this.getItemForKey(email+"_session");
        return sesion

    }

    async saveLastUser(email){
        try{
            await this.setItemForKey("lastUser",email);
        }catch(error){

        }
    }

    async getLastUser(){
        try{
            let user = await this.getItemForKey("lastUser");
            return user;
        }catch(error){

        }
    }

    async setItemForKey(key, userData) {
        console.log('saveData ----->' + JSON.stringify(userData))
        try {
            if (key) {
                await AsyncStorage.setItem(key, JSON.stringify(userData))
                console.log('----> Success')
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error();
        }

    }

} 