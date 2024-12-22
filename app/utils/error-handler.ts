export class ErrorHandler {
  static handleError(error: Error, context: string): string {
    console.error(`[${context}] Error:`, error);
    
    if (error.message.includes('INTERNET_DISCONNECTED')) {
      return 'Vérifiez votre connexion Internet';
    }
    
    if (error.message.includes('INVALID_RSS')) {
      return 'Format RSS invalide';
    }
    
    return 'Une erreur est survenue. Veuillez réessayer.';
  }
}