package com.totem_guarucoorp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.totem_guarucoorp.Sitef



class SitefModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sitefInstance: Sitef = Sitef()

    override fun getName(): String {
        return "SitefModule"
    }

    @ReactMethod
    fun pagar(param: String, promise: Promise) {
        try {
            val result = sitefInstance.pagar(param)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("Erro ao chamar o método pagar", e)
        }
    }
}
