package com.totem_guarucoorp

import br.com.pagamento.sitefpay.model.CallBackEvent
import br.com.pagamento.sitefpay.model.DadosPagamento
import br.com.pagamento.sitefpay.pagamentoservice.SitefPay
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.math.BigDecimal

class SitefModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var sitefInstance: SitefPay? = null

    private fun initializeSitefInstance() {
        val activity = currentActivity
        if (activity != null && sitefInstance == null) {
            sitefInstance = SitefPay(activity)
        }
    }

    override fun getName(): String {
        return "SitefPag"
    }

    @ReactMethod
    fun configurarSitef(
        ipTEF: String,
        cnpj: String,
        terminalTef: String,
        cnpjAutomacao: String,
        empresaSitef: String,
        comExterior: Int,
        otp: String,
        nomeIntegracao: String,
        promise: Promise
    ) {
        try {
            initializeSitefInstance()
            if (sitefInstance == null) {
                promise.reject("ERRO_INICIALIZACAO", "sitefInstance não foi inicializado.")
                return
            }

            sitefInstance?.configuraMsitef(
                ipTEF, cnpj, terminalTef, cnpjAutomacao, empresaSitef, comExterior, otp, nomeIntegracao, null
            )
            promise.resolve("Configuração realizada com sucesso")
        } catch (e: Exception) {
            promise.reject("Erro ao configurar Sitef", e)
        }
    }

    @ReactMethod
    fun cancelarTransacao(valor: String, promise: Promise) {
        try {
            val valorBigDecimal = BigDecimal(valor)
            initializeSitefInstance()
            if (sitefInstance == null) {
                promise.reject("ERRO_INICIALIZACAO", "sitefInstance não foi inicializado.")
                return
            }

            sitefInstance?.cancelarTransacao(valorBigDecimal, object : CallBackEvent() {
                override fun <T> Concluido(codigoRetorno: Int, msg: String, result: T?) {
                    if (codigoRetorno == 0) {
                        promise.resolve(result)
                    } else {
                        promise.reject(codigoRetorno.toString(), msg)
                    }
                }
            })
        } catch (e: Exception) {
            promise.reject("Erro ao cancelar transação", e)
        }
    }

    @ReactMethod
    fun transacoesGerenciaisConfig(promise: Promise) {
        try {
            initializeSitefInstance()
            if (sitefInstance == null) {
                promise.reject("ERRO_INICIALIZACAO", "sitefInstance não foi inicializado.")
                return
            }

            sitefInstance?.transacoesGerenciais(object : CallBackEvent() {
                override fun <T> Concluido(codigoRetorno: Int, msg: String, result: T?) {
                    if (codigoRetorno == 0) {
                        promise.resolve(msg)
                    } else {
                        promise.reject(codigoRetorno.toString(), msg)
                    }
                }
            })
        } catch (e: Exception) {
            promise.reject("Erro ao configurar transações gerenciais", e)
        }
    }

    @ReactMethod
    fun pagar(
        modPagamento: Int, //CREDITO(0), DEBITO(1), PIX(2);
        vezes: Int,
        valor: String,
        promise: Promise
    ) {
        try {
            val valorBigDecimal = BigDecimal(valor)
            initializeSitefInstance()
            if (sitefInstance == null) {
                promise.reject("ERRO_INICIALIZACAO", "sitefInstance não foi inicializado.")
                return
            }

            sitefInstance?.pagar(modPagamento, vezes, valorBigDecimal, object : CallBackEvent() {
                override fun <T> Concluido(codigoRetorno: Int, msg: String, result: T?) {
                    if (codigoRetorno == 0) {
                        promise.resolve(result as DadosPagamento) // Transformar em JSON se necessário
                    } else {
                        promise.reject(codigoRetorno.toString(), msg)
                    }
                }
            })
        } catch (e: Exception) {
            promise.reject("Erro ao chamar o método pagar", e)
        }
    }
}
