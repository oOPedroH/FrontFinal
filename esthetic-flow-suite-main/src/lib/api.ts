import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// API de Clientes
export const clientesAPI = {
  listar: async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome');
    
    if (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
    return data;
  },
  
  buscarPorId: async (id: string) => {
    const { data, error } = await supabase
      .from('clientes')
      .select(`
        *,
        agendamentos:agendamentos(
          *,
          servico:servicos(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  criar: async (cliente: any) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select();
    
    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
    return data[0];
  },
  
  atualizar: async (id: string, cliente: any) => {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  excluir: async (id: string) => {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};

// API de Serviços
export const servicosAPI = {
  listar: async () => {
    const { data, error } = await supabase
      .from('servicos')
      .select(`
        *,
        categoria:categorias(*)
      `)
      .eq('ativo', true)
      .order('titulo');
    
    if (error) throw error;
    return data;
  },
  
  listarAdmin: async () => {
    const { data, error } = await supabase
      .from('servicos')
      .select(`
        *,
        categoria:categorias(*)
      `)
      .order('titulo');
    
    if (error) throw error;
    return data;
  },
  
  listarPorCategoria: async (categoriaId: string) => {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('categoria_id', categoriaId)
      .eq('ativo', true)
      .order('titulo');
    
    if (error) throw error;
    return data;
  },
  
  buscarPorId: async (id: string) => {
    const { data, error } = await supabase
      .from('servicos')
      .select(`
        *,
        categoria:categorias(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  criar: async (servico: any) => {
    const { data, error } = await supabase
      .from('servicos')
      .insert([servico])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  atualizar: async (id: string, servico: any) => {
    const { data, error } = await supabase
      .from('servicos')
      .update(servico)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  excluir: async (id: string) => {
    const { error } = await supabase
      .from('servicos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};

// API de Categorias
export const categoriasAPI = {
  listar: async () => {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('ativa', true)
      .order('ordem');
    
    if (error) throw error;
    return data;
  },
  
  listarAdmin: async () => {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('ordem');
    
    if (error) throw error;
    return data;
  },
  
  buscarPorId: async (id: string) => {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  criar: async (categoria: any) => {
    const { data, error } = await supabase
      .from('categorias')
      .insert([categoria])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  atualizar: async (id: string, categoria: any) => {
    const { data, error } = await supabase
      .from('categorias')
      .update(categoria)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  excluir: async (id: string) => {
    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};

// API de Agendamentos
export const agendamentosAPI = {
  listar: async () => {
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        cliente:clientes(*),
        servico:servicos(*)
      `)
      .order('data, hora');
    
    if (error) throw error;
    return data;
  },
  
  listarPorStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        cliente:clientes(*),
        servico:servicos(*)
      `)
      .eq('status', status)
      .order('data, hora');
    
    if (error) throw error;
    return data;
  },
  
  listarPorData: async (data: Date) => {
    const dataFormatada = format(data, 'yyyy-MM-dd');
    
    const { data: agendamentos, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        cliente:clientes(*),
        servico:servicos(*)
      `)
      .eq('data', dataFormatada)
      .order('hora');
    
    if (error) throw error;
    return agendamentos;
  },
  
  buscarPorId: async (id: string) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        cliente:clientes(*),
        servico:servicos(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  verificarDisponibilidade: async (data: Date, hora: string, servicoId: string, agendamentoId?: string) => {
    const dataFormatada = format(data, 'yyyy-MM-dd');
    
    const { data: resultado, error } = await supabase
      .rpc('verificar_disponibilidade_horario', {
        p_data: dataFormatada,
        p_hora: hora,
        p_servico_id: servicoId,
        p_agendamento_id: agendamentoId
      });
    
    if (error) throw error;
    return resultado;
  },
  
  horariosDisponiveis: async (data: Date, servicoId: string) => {
    const dataFormatada = format(data, 'yyyy-MM-dd');
    
    // Primeiro, buscar informações da configuração
    const { data: config, error: configError } = await supabase
      .from('configuracoes')
      .select('*')
      .limit(1)
      .single();
    
    if (configError) throw configError;
    
    // Buscar o serviço para saber sua duração
    const { data: servico, error: servicoError } = await supabase
      .from('servicos')
      .select('duracao')
      .eq('id', servicoId)
      .single();
    
    if (servicoError) throw servicoError;
    
    // Verificar dia da semana
    const diaSemana = data.getDay(); // 0 = domingo, 1 = segunda, ...
    if (!config.dias_funcionamento.includes(diaSemana)) {
      return []; // Clínica não funciona neste dia
    }
    
    // Gerar array de horários possíveis baseado na configuração
    const horarios: string[] = [];
    let hora = config.horario_abertura;
    const horaFechamento = config.horario_fechamento;
    
    while (hora < horaFechamento) {
      const [horaNum, minutoNum] = hora.split(':').map(Number);
      
      // Verificar disponibilidade para cada horário
      const { data: disponivel, error } = await supabase
        .rpc('verificar_disponibilidade_horario', {
          p_data: dataFormatada,
          p_hora: hora,
          p_servico_id: servicoId
        });
      
      if (error) throw error;
      
      if (disponivel) {
        horarios.push(hora);
      }
      
      // Avançar para o próximo intervalo
      const novoMinuto = minutoNum + config.intervalo_agendamento;
      const novaHora = horaNum + Math.floor(novoMinuto / 60);
      const novoMinutoAjustado = novoMinuto % 60;
      
      hora = `${novaHora.toString().padStart(2, '0')}:${novoMinutoAjustado.toString().padStart(2, '0')}`;
    }
    
    return horarios;
  },
  
  criar: async (agendamento: any) => {
    // Primeiro verificar disponibilidade
    const dataObj = new Date(agendamento.data);
    const { data: disponivel, error: dispError } = await supabase
      .rpc('verificar_disponibilidade_horario', {
        p_data: agendamento.data,
        p_hora: agendamento.hora,
        p_servico_id: agendamento.servico_id
      });
    
    if (dispError) throw dispError;
    if (!disponivel) throw new Error("Horário não disponível");
    
    // Se disponível, criar o agendamento
    const { data, error } = await supabase
      .from('agendamentos')
      .insert([agendamento])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  atualizar: async (id: string, agendamento: any) => {
    // Verificar disponibilidade para atualização
    if (agendamento.data && agendamento.hora && agendamento.servico_id) {
      const { data: disponivel, error: dispError } = await supabase
        .rpc('verificar_disponibilidade_horario', {
          p_data: agendamento.data,
          p_hora: agendamento.hora,
          p_servico_id: agendamento.servico_id,
          p_agendamento_id: id
        });
      
      if (dispError) throw dispError;
      if (!disponivel) throw new Error("Horário não disponível");
    }
    
    const { data, error } = await supabase
      .from('agendamentos')
      .update(agendamento)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  cancelar: async (id: string, motivo?: string) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .update({
        status: 'cancelado',
        observacoes: motivo
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  concluir: async (id: string) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .update({
        status: 'concluido'
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  excluir: async (id: string) => {
    const { error } = await supabase
      .from('agendamentos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};

// API de Configurações
export const configuracoesAPI = {
  obter: async () => {
    const { data, error } = await supabase
      .from('configuracoes')
      .select('*')
      .limit(1)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  atualizar: async (id: string, config: any) => {
    const { data, error } = await supabase
      .from('configuracoes')
      .update(config)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// API para Dashboard e Estatísticas
export const dashboardAPI = {
  estatisticas: async () => {
    // Total de clientes
    const { count: totalClientes, error: errorClientes } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true });
    
    if (errorClientes) throw errorClientes;
    
    // Total de serviços
    const { count: totalServicos, error: errorServicos } = await supabase
      .from('servicos')
      .select('*', { count: 'exact', head: true })
      .eq('ativo', true);
    
    if (errorServicos) throw errorServicos;
    
    // Data atual
    const hoje = format(new Date(), 'yyyy-MM-dd');
    
    // Agendamentos hoje
    const { count: agendamentosHoje, error: errorHoje } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .eq('data', hoje)
      .eq('status', 'agendado');
    
    if (errorHoje) throw errorHoje;
    
    // Próximos agendamentos (futuros)
    const { count: proximosAgendamentos, error: errorProximos } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .gt('data', hoje)
      .eq('status', 'agendado');
    
    if (errorProximos) throw errorProximos;
    
    // Agendamentos concluídos
    const { count: agendamentosConcluidos, error: errorConcluidos } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'concluido');
    
    if (errorConcluidos) throw errorConcluidos;
    
    // Agendamentos cancelados
    const { count: agendamentosCancelados, error: errorCancelados } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'cancelado');
    
    if (errorCancelados) throw errorCancelados;
    
    return {
      totalClientes: totalClientes || 0,
      totalServicos: totalServicos || 0,
      agendamentosHoje: agendamentosHoje || 0,
      proximosAgendamentos: proximosAgendamentos || 0,
      agendamentosConcluidos: agendamentosConcluidos || 0,
      agendamentosCancelados: agendamentosCancelados || 0
    };
  },
  
  agendamentosRecentes: async (limite: number = 5) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        cliente:clientes(nome, email, telefone),
        servico:servicos(titulo, preco)
      `)
      .order('data', { ascending: true })
      .order('hora', { ascending: true })
      .eq('status', 'agendado')
      .gte('data', format(new Date(), 'yyyy-MM-dd'))
      .limit(Number(limite));
    
    if (error) throw error;
    return data;
  },
  
  clientesRecentes: async (limite: number = 5) => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(Number(limite));
    
    if (error) throw error;
    return data;
  },
  
  resumoMensal: async () => {
    const dataInicio = new Date();
    dataInicio.setDate(1); // Primeiro dia do mês
    const dataFim = new Date(dataInicio);
    dataFim.setMonth(dataFim.getMonth() + 1);
    dataFim.setDate(0); // Último dia do mês
    
    const inicioStr = format(dataInicio, 'yyyy-MM-dd');
    const fimStr = format(dataFim, 'yyyy-MM-dd');
    
    // Agendamentos do mês
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        *,
        servico:servicos(titulo, preco)
      `)
      .gte('data', inicioStr)
      .lte('data', fimStr);
    
    if (error) throw error;
    
    // Calcular total e média
    let totalMes = 0;
    let totalConcluidos = 0;
    let totalCancelados = 0;
    
    data.forEach(agendamento => {
      if (agendamento.servico) {
        const preco = parseFloat(agendamento.servico.preco);
        
        if (agendamento.status === 'concluido') {
          totalMes += preco;
          totalConcluidos += 1;
        } else if (agendamento.status === 'cancelado') {
          totalCancelados += 1;
        }
      }
    });
    
    return {
      totalMes,
      totalAgendamentos: data.length,
      totalConcluidos,
      totalCancelados,
      mediaTicket: totalConcluidos > 0 ? (totalMes / totalConcluidos) : 0
    };
  }
};
