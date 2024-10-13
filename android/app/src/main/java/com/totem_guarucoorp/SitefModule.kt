package com.totem_guarucoorp

import android.util.Log
import br.com.pagamento.sitefpay.model.CallBackEvent
import br.com.pagamento.sitefpay.model.DadosPagamento
import br.com.pagamento.sitefpay.pagamentoservice.SitefPay
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.google.gson.Gson
import java.math.BigDecimal
import java.text.SimpleDateFormat


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
        Log.d("PAGAR_METODO", "$modPagamento, $vezes, ${promise.toString()}")
        try { // vou adicionar algus logs aqui
            val valorBigDecimal = BigDecimal(valor)
            initializeSitefInstance()
            if (sitefInstance == null) {
                promise.reject("ERRO_INICIALIZACAO", "sitefInstance não foi inicializado.")
                return
            }

            // blz consegue executar ? pf tem que instalar denovo so para ele executar esses logs quando for pagar

            Log.d("PAGAR_METODO", "inicializar pagamento")
            sitefInstance?.pagar(modPagamento, vezes, valorBigDecimal, object : CallBackEvent() {
                override fun <T> Concluido(codigoRetorno: Int, msg: String, result: T?) {
                    Log.d("PAGAR_METODO", "callback retorno $msg")
                    if (codigoRetorno == 0) {
                        try {
                            if (result != null) {
                                val json = Gson()
                                val dadosPagamento = result as DadosPagamento
                                val dadosPagJson = json.toJson(dadosPagamento)
                                promise.resolve(dadosPagJson)
                                Log.d("PAGAR_METODO", "retorno $dadosPagJson")
                            } else {
                                Log.d("PAGAR_METODO", "retorno $msg")
                                promise.reject("Erro de Pagamento", "Retorno vazio dados pagamento!")
                            }
                            Log.d("PAGAR_METODO", "Finalizou operação")
                            return
                        } catch (e: Exception) {
                            Log.d("PAGAR_METODO", "Exception ${e.message} + ,, ${e.cause}") // pode exeucar denovo espero que funcione o brackpoint se nao ao menos vamos ter a exception
                            promise.reject("Erro de Pagamento", "Não foi possivel identificar o retorno do pagamento ")
                        }
                    } else {
                        Log.d("PAGAR_METODO", "Erro ao realizar pagamento. Detalhe: $msg")
                        promise.reject(codigoRetorno.toString(), msg)
                    }
                }
            })
        } catch (e: Exception) {
            promise.reject("Erro ao chamar o método pagar", e)
            Log.e("SitefModule", "Erro ao chamar o método pagar", e)
        }
    }

    fun toWritableMap(dados: DadosPagamento): WritableMap {
        val map = Arguments.createMap()
        map.putString("idTef", dados.idTef)
        map.putString("codNSU", dados.codNSU)
        map.putString("codAut", dados.codAut)
        // Convertendo Date para String
        val sdf: SimpleDateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        map.putString("dRetorno", sdf.format(dados.dRetorno))
        map.putString("codControle", dados.codControle)
        map.putString("retTexto", dados.retTexto)
        map.putString("viaCliente", dados.viaCliente)
        map.putString("viaEstabelecimento", dados.viaEstabelecimento)
        map.putInt("tpConfirmacao", dados.tpConfirmacao)
        map.putString("numCartao", dados.numCartao)
        map.putString("bandeira", dados.bandeira)
        map.putString("rede", dados.rede)
        map.putString("financiamento", dados.financiamento)
        map.putDouble("vPagamento", dados.vPagamento)
        map.putInt("modPagamento", dados.modPagamento)
        map.putInt("qtdParcelas", dados.qtdParcelas)
        // Convertendo outra Date para String
        map.putString("dTransacao", sdf.format(dados.dTransacao))
        map.putString("arqRetorno", dados.arqRetorno)
        map.putInt("tpPagamento", dados.tpPagamento.value)
        return map
    }
}
