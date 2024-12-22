export interface TaskerVariable {
  name: string;
  value: string;
}

export class TaskerService {
  static sendToTasker(variables: TaskerVariable[]): void {
    try {
      // Simulation de l'envoi à Tasker (à implémenter avec l'API réelle de Tasker)
      console.log('Sending to Tasker:', variables);
      
      // TODO: Implémenter l'intégration réelle avec Tasker
      // Exemple:
      // TaskerPlugin.fireEvent({
      //   eventName: 'RSS_UPDATE',
      //   variables: variables
      // });
    } catch (error) {
      console.error('Error sending to Tasker:', error);
      throw error;
    }
  }

  static createFeedVariables(item: any): TaskerVariable[] {
    return [
      { name: '%rss_title', value: item.title },
      { name: '%rss_description', value: item.description },
      { name: '%rss_link', value: item.link },
      { name: '%rss_date', value: item.pubDate.toISOString() },
      { name: '%rss_image', value: item.imageUrl || '' }
    ];
  }
}