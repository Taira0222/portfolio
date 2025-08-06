import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile image placeholder - for future implementation */}
            <div className="flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Profile Image</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                {t('about.name')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t('about.description')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};