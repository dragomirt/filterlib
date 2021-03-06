#include <stdio.h>
#include <MagickWand.h>

struct appData {
    char* imageInput;
    char* imageOutput;
    int oilRadius;
    int oilSigma;
};

enum bool {
    false = 0,
    true = 1
};

void checkFlags(struct appData *data, const int argc, const char** args);
enum bool startsWith(const char *pre, const char *str);
void printConfigData(const struct appData *data);

int main(int argc, char** argv)
{
    struct appData runtimeData;
    
    checkFlags(&runtimeData, argc, argv);
    
    printf("Oil Filter on %s\tOutput on %s\n", runtimeData.imageInput, runtimeData.imageOutput);
    
    MagickWand *m_wand = NULL;
    
    MagickWandGenesis();
    
    m_wand = NewMagickWand();
    MagickReadImage(m_wand, runtimeData.imageInput);
    
    MagickOilPaintImage(m_wand, runtimeData.oilRadius, runtimeData.oilSigma);
    
    /* Write the new image */
    MagickWriteImage(m_wand,runtimeData.imageOutput);
    

    if(m_wand)m_wand = DestroyMagickWand(m_wand);
    MagickWandTerminus();
    
    return 0;
}

void checkFlags(struct appData *data, const int argc, const char** args) {
    
    for (int i = 0; i < argc; i++) {
        if (startsWith("-r", args[i])) {
            // Convert char* to int using atoi and add to the application config
            data->oilRadius = atoi(args[i+1]);
        }
        
        if (startsWith("-s", args[i])) {
            data->oilSigma = atoi(args[i+1]);
        }
        
        if (startsWith("-imgI", args[i])) {
            data->imageInput = args[i+1];
        }
        
        if (startsWith("-imgO", args[i])) {
            data->imageOutput = args[i+1];
        }
        
        if (startsWith("-pc", args[i])) {
            printConfigData(data);
        }
    }
}

enum bool startsWith(const char *pre, const char *str)
{
    size_t lenpre = strlen(pre),
    lenstr = strlen(str);
    return lenstr < lenpre ? false : memcmp(pre, str, lenpre) == 0;
}
    
void printConfigData(const struct appData *data) {
    printf("Input Image: %s\nOutput Image: %s\nOil Radius: %d\nOil Sigma: %d\n", data->imageInput, data->imageOutput, data->oilRadius, data->oilSigma);
}
