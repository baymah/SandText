import {IncomingWebhook} from '@slack/webhook';
import { SlackChannel } from '../../domain/slackChannel';
import axios from 'axios';
export interface ISlackService {
  sendMessage (text: string, channel: SlackChannel): Promise<any>
}

export class SlackService implements ISlackService {
  private growthChannelHookUrl: string = 'https://hooks.slack.com/services/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';
  private supportChannelHookUrl: string = 'https://hooks.slack.com/services/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';



  constructor () {

  }

  private getWebookUrl (channel: SlackChannel): string {
    switch (channel) {
      case 'growth':
        return this.growthChannelHookUrl;
      case 'support':
        return this.supportChannelHookUrl;
      default:
        return "";
    }
  }

  async sendMessage (text: string, channel: SlackChannel,hook='apiLogs'): Promise<any> {
    try{
    const url: string = this.getWebookUrl(channel);
    const apiLogsHook = new IncomingWebhook(url);
    const hooksMap: Record<string, IncomingWebhook> = {
      apiLogs:apiLogsHook
    };

        const webhook = hooksMap[hook] || apiLogsHook;
        await webhook.send({ text });
      }
    // try{
    //   const url: string = this.getWebookUrl(channel);
    //   return axios.post(url, { text });
    // }
    catch(notifyError:any){
      console.log(notifyError,"What error message");
    }
  }
}
