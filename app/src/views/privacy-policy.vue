<template>
  <TopBar />
  <div class="section-wrapper">
    <Button variant="link" as-child class="px-0">
      <router-link :to="{ name: 'Home' }"> Voltar </router-link>
    </Button>
    <p class="mb-4 text-2xl">Nossa politica de privacidade</p>
    <div class="mb-12 flex flex-col gap-2">
      <p class="text-xl">1. Introdução</p>
      <p>
        Bem-vindo à MailMonster! Estamos comprometidos em proteger sua
        privacidade e garantir que você tenha total controle sobre as
        comunicações que recebe. Esta Política de Privacidade descreve como
        coletamos, usamos e protegemos suas informações pessoais, e os direitos
        que você possui em relação ao controle das suas preferências de
        comunicação.
      </p>
      <p class="mt-2 text-xl">2. Coleta de Informações</p>
      <p>
        Quando você se inscreve para usar a MailMonster, podemos coletar as
        seguintes informações:
      </p>

      <p>
        Informações de Contato: como seu nome, endereço de e-mail, e outras
        informações que você fornecer voluntariamente ao se inscrever ou ao
        personalizar suas preferências de comunicação.
      </p>
      <p>
        Preferências de Comunicação: informações sobre o tipo de comunicação que
        você deseja receber, a frequência, e o formato.
      </p>
      <p>
        Interações com E-mails: dados sobre como você interage com as
        comunicações enviadas através da MailMonster, incluindo aberturas de
        e-mail, cliques e outras ações.
      </p>
      <p class="mt-2 text-xl">3. Uso das Informações</p>

      <p>As informações coletadas são utilizadas para:</p>

      <p>
        Personalizar sua Experiência: para garantir que você receba apenas as
        comunicações que são relevantes para você e no formato de sua
        preferência.
      </p>
      <p>
        Gerenciamento de Assinaturas: para permitir que você adicione ou
        remova-se de listas de comunicação de forma simples e eficaz.
      </p>
      <p>
        Melhorar Nossos Serviços: para analisar e entender as preferências e
        comportamentos dos usuários, ajudando-nos a aprimorar nossa plataforma e
        serviços.
      </p>
      <p class="mt-2 text-xl">4. Controle e Personalização</p>

      <p>
        A MailMonster coloca você no controle total das suas comunicações. A
        qualquer momento, você pode:
      </p>

      <p>
        Atualizar suas Preferências: escolher que tipo de comunicação deseja
        receber, com que frequência e em qual formato.
      </p>
      <p>
        Cancelar Inscrição: optar por não receber mais comunicações específicas
        ou remover-se de todas as listas de e-mail das quais faz parte com
        apenas um clique.
      </p>
      <p class="mt-2 text-xl">5. Compartilhamento de Informações</p>

      <p>
        Nós não compartilhamos suas informações pessoais com terceiros, exceto
        quando necessário para operar a plataforma MailMonster (como provedores
        de serviços que auxiliam no envio de e-mails) ou conforme exigido por
        lei.
      </p>

      <p class="mt-2 text-xl">6. Segurança</p>

      <p>
        Implementamos medidas de segurança técnicas e organizacionais para
        proteger suas informações pessoais contra acesso não autorizado, perda
        ou destruição. No entanto, lembramos que nenhum método de transmissão
        pela internet ou armazenamento eletrônico é 100% seguro.
      </p>

      <p class="mt-2 text-xl">7. Seus Direitos</p>

      <p>Você tem o direito de:</p>

      <p>
        Acessar: solicitar uma cópia das informações pessoais que mantemos sobre
        você.
      </p>
      <p>
        Corrigir: atualizar ou corrigir suas informações pessoais se elas
        estiverem incorretas.
      </p>
      <p>
        Excluir: solicitar a exclusão de suas informações pessoais em
        determinadas circunstâncias.
      </p>
      <p>
        Retirar Consentimento: retirar seu consentimento para o processamento
        das suas informações pessoais a qualquer momento.
      </p>
      <p class="mt-2 text-xl">8. Alterações nesta Política</p>

      <p>
        Podemos atualizar esta Política de Privacidade periodicamente para
        refletir mudanças em nossas práticas ou em leis aplicáveis. Recomendamos
        que você reveja esta política regularmente para se manter informado.
      </p>

      <p class="mt-2 text-xl">9. Contato</p>

      <p>
        Se você tiver alguma dúvida ou preocupação sobre esta Política de
        Privacidade, entre em contato conosco pelo e-mail
        <a href="mailto: andreluizrodper@gmail.com" class="underline">
          andreluizrodper@gmail.com </a
        >.
      </p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { Button } from "@/components/ui/button";
import TopBar from "@/components/home/top-bar.vue";
import Footer from "@/components/home/footer.vue";
</script>
