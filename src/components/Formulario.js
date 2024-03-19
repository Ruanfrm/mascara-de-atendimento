import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import { GiRollingEnergy } from "react-icons/gi";






const Formulario = () => {
    const [tipoAtendimento, setTipoAtendimento] = useState('');
    const [quemFalou, setQuemFalou] = useState('');
    const [nomeOutraPessoa, setNomeOutraPessoa] = useState('');
    const [numeroContato, setNumeroContato] = useState('');
    const [descricaoProblema, setDescricaoProblema] = useState('');
    const [sondagem, setSondagem] = useState('');
    const [solucaoProblema, setSolucaoProblema] = useState('');
    const [abrirChamadoExterno, setAbrirChamadoExterno] = useState(false);
    const [dataChamadoExterno, setDataChamadoExterno] = useState('');
    const [periodoChamadoExterno, setPeriodoChamadoExterno] = useState('');
    const [acessoRemoto, setAcessoRemoto] = useState('');
    const [textoGerado, setTextoGerado] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    
  

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para gerar o texto
        let texto = '';
        if (tipoAtendimento === 'receptivo') {
            if (quemFalou === 'titular') {
                texto = `Próprio titular. Entrou em contato com o número ${numeroContato}.\n ${descricaoProblema}. \n ${sondagem}. \n${solucaoProblema}.`;
            } else {
                texto = `${nomeOutraPessoa}, ${quemFalou} do(a) titular. Entrou em contato com o número ${numeroContato}.\n ${descricaoProblema}. \n ${sondagem}. \n${solucaoProblema}.`;
            }
        } else if (tipoAtendimento === 'ativo') {
            if (quemFalou === 'titular') {
                texto = `Realizado contato com Próprio titular. No número ${numeroContato}.\n ${descricaoProblema}. \n ${sondagem}. \n${solucaoProblema}.`;
            } else {
                texto = `Realizado contato com ${nomeOutraPessoa}, ${quemFalou} do(a) titular. No número ${numeroContato}.\n ${descricaoProblema}. \n ${sondagem}. \n${solucaoProblema}.`;
            }
        }
        // Verificar se o chamado externo foi aberto e adicionar ao texto
        if (abrirChamadoExterno) {
            texto += `\nRealizado o pré-agendamento. Próprio titular informa ter disponibilidade para receber a equipe no dia ${dataChamadoExterno} no período da ${periodoChamadoExterno}.`;
        }
        // Verificar se o acesso remoto foi realizado e adicionar ao texto
        if (acessoRemoto === 'sim') {
            texto += '\nFoi realizado acesso remoto.';
        } else if (acessoRemoto === 'naoAceitou') {
            texto += '\nCliente não aceitou o acesso remoto.';
        } else if (acessoRemoto === 'semEquipamento') {
            texto += '\nCliente não possui equipamento para acesso remoto.';
        } else if (acessoRemoto === 'clienteAusente') {
            texto += '\nCliente não estava em casa para o acesso remoto.';
        }
        setTextoGerado(texto);
        // Abrir modal
        setModalAberto(true);
    };
    
    const limparCampos = () => {
        setTipoAtendimento('');
        setQuemFalou('');
        setNomeOutraPessoa('');
        setNumeroContato('');
        setDescricaoProblema('');
        setSondagem('');
        setSolucaoProblema('');
        setAbrirChamadoExterno(false);
        setDataChamadoExterno('');
        setPeriodoChamadoExterno('');
        setAcessoRemoto('');
    };
    
    const handleCloseModal = () => {
        // Fechar modal e limpar campos
        setModalAberto(false);
        setTextoGerado('');
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(textoGerado);
        toast.success('Texto copiado para a área de transferência!');
      };
    
    

  return (
    <div className="dark:bg-zinc-950 text-zinc-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Tipo de Atendimento</label>
            <select value={tipoAtendimento} onChange={(e) => setTipoAtendimento(e.target.value)} className="py-2 px-4 bg-gray-700 text-gray-200 rounded " required>
              <option value="">Selecione o tipo de atendimento</option>
              <option value="ativo">Ativo</option>
              <option value="receptivo">Receptivo</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Com Quem Falou</label>
            <select value={quemFalou} onChange={(e) => setQuemFalou(e.target.value)} className="py-2 px-4 bg-gray-700 text-gray-200 rounded" required>
              <option value="" disabled>Selecione com quem falou</option>
              <option value="titular">Titular</option>
              <option value="esposo">Esposo(a)</option>
              <option value="irmao">Irmã(o)</option>
              <option value="mae">Mãe</option>
              <option value="pai">Pai</option>
              <option value="filho">Filho</option>
              <option value="primo">Primo(a)</option>
              <option value="amigo">Amigo(a)</option>
              <option value="tio">Tio(a)</option>
              <option value="sobrinho">Sobrinho(a)</option>
              <option value="vizinho">Vizinho(a)</option>
              <option value="empregado">Empregado(a)</option>
            </select>
            {quemFalou !== 'titular' && (
              <input type="text" value={nomeOutraPessoa} onChange={(e) => setNomeOutraPessoa(e.target.value)} placeholder="Nome da outra pessoa" className=" py-2 px-4 bg-gray-700 text-gray-200 rounded" required />
            )}
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Número de Contato</label>
            <input type="text" value={numeroContato} placeholder='Número de contato' onChange={(e) => setNumeroContato(e.target.value)} className="py-2 px-4 bg-gray-700 text-gray-200 rounded" required />
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Descrição do Problema</label>
            <textarea value={descricaoProblema} placeholder='Descreva de forma detalhada a reclamação ou problema do cliente' onChange={(e) => setDescricaoProblema(e.target.value)} className="py-2 px-4 min-h-28 bg-gray-700 text-gray-200 rounded" required />
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Sondagem</label>
            <textarea value={sondagem} placeholder='Descreva de forma detalhada qual a triagem para identificar o problema' onChange={(e) => setSondagem(e.target.value)} className="py-2 px-4 bg-gray-700 min-h-28 text-gray-200 rounded" required />
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Solução do Problema</label>
            <textarea value={solucaoProblema} placeholder="Detalhar na descrição quais as ações foram tomadas para solucionar aquele problema. Caso não seja possível resolver, sempre deixar claro na ligação e no registro do protocolo o que será feito" onChange={(e) => setSolucaoProblema(e.target.value)} className="py-2 px-4  min-h-56 bg-gray-700 text-gray-200 rounded  " required />
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="flex items-center text-zinc-100">
              <input type="checkbox" checked={abrirChamadoExterno} onChange={(e) => setAbrirChamadoExterno(e.target.checked)} className="form-checkbox h-5 w-5 text-indigo-600" />
              <span className="ml-2">Abrir chamado externo?</span>
            </label>
            {abrirChamadoExterno && (
              <div className="grid grid-cols-1 gap-y-4">
                <label className="text-zinc-100">Data do Chamado Externo</label>
                <input type="date" value={dataChamadoExterno} onChange={(e) => setDataChamadoExterno(e.target.value)} className="py-2 px-4 bg-gray-700 text-gray-200 rounded" />
                <div className="flex items-center text-zinc-100">
                  <label className="mr-2">
                    <input type="radio" value="manha" checked={periodoChamadoExterno === 'manha'} onChange={() => setPeriodoChamadoExterno('manha')} className="form-radio h-4 w-4 text-indigo-600" />
                    <span className="ml-1">Manhã</span>
                  </label>
                  <label>
                    <input type="radio" value="tarde" checked={periodoChamadoExterno === 'tarde'} onChange={() => setPeriodoChamadoExterno('tarde')} className="form-radio h-4 w-4 text-indigo-600" />
                    <span className="ml-1">Tarde</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <label className="text-zinc-100">Realizou acesso remoto?</label>
            <select value={acessoRemoto} onChange={(e) => setAcessoRemoto(e.target.value)} className="py-2 px-4 bg-gray-700 text-gray-200 rounded" required>
              <option value="" disabled>Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
              <option value="naoAceitou">Cliente não aceitou</option>
              <option value="semEquipamento">Cliente não tem equipamento</option>
              <option value="clienteAusente">Cliente não estava em casa</option>
            </select>
          </div>
          <div className='flex'>
            <button onClick={limparCampos}  className=" hover:text-green-400 text-white font-bold py-2 px-3 rounded mr-2 flex">
            <PiBroom className='mr-2' size={25} />
              Limpar 
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2 flex">
            <GiRollingEnergy className='mr-2' size={25} />
              Gerar Informações
            </button>
          </div>
        </form>
        {/* Modal */}
        <Modal isOpen={modalAberto} onRequestClose={handleCloseModal} className="modal" overlayClassName="overlay">
          <div className="text-center">
            <div className='flex justify-between'>
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Texto Gerado</h2>
            <IoCloseCircleOutline onClick={handleCloseModal} size={25} className='text-red-500 hover:text-red-600'/>
            </div>
            <p className="whitespace-pre-wrap text-zinc-100 text-justify">{textoGerado}</p>
            <div className='flex items-center justify-center mt-4'>
            <button onClick={handleCopyToClipboard} className="  hover:text-blue-700 text-white font-bold rounded  flex"> <MdContentCopy size={25} className='mr-2' />Copiar Texto</button>
            </div>

          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Formulario;
