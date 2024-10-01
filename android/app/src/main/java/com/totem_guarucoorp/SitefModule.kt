package com.totem_guarucoorp

import br.com.testes.sitef.SitefPag
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise




class SitefModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sitefInstance: SitefPag = SitefPag()

    override fun getName(): String {
        return "SitefPag"
    }

    @ReactMethod
    fun pagar(promise: Promise) {
        try {
            val result = sitefInstance.pagar()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("Erro ao chamar o método pagar", e)
        }
    }
}
