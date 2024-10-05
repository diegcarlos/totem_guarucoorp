package com.totem_guarucoorp

import br.com.pagamento.sitefpay.model.CallBackEvent
import br.com.pagamento.sitefpay.pagamentoservice.SitefPay
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.math.BigDecimal


class SitefModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sitefInstance: SitefPay = SitefPay(currentActivity!!)

    override fun getName(): String {
        return "SitefPag"
    }

    @ReactMethod
    fun configurarSitef() {
        try {
            TODO("Configurações do msitef")
//            sitefInstance.configuraMsitef()
        } catch (e: Exception) {

        }
    }

    @ReactMethod
    fun cancelarTransacao(valor: BigDecimal, callback: CallBackEvent) {
        try {
            sitefInstance.cancelarTransacao(valor, callback)
        } catch (e: Exception) {

        }
    }

    @ReactMethod
    fun transacoesGerenciaisConfig(callback: CallBackEvent) {
        try {
            sitefInstance.transacoesGerenciais(callback)
        } catch (e: Exception) {

        }
    }

    @ReactMethod
    fun pagar(promise: Promise) {
        try {
            TODO("Todo pagamento")
//            val result = sitefInstance.pagar()
//            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("Erro ao chamar o método pagar", e)
        }
    }
}
