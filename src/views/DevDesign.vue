<template>
        <div class="mb-8 flex flex-col gap-4">
            <Card>
                <template #header>
                    This is the dev playground for Celi's Herstal Template.
                </template>

                <template #description>
                    This page tries to include all system base componentes and custom ones, togheter with their variations and examples
                </template>

                <template #body>
                    This is a card.
                </template>
            </Card>

            <Accordion header="Buttons">
                <div class="flex flex-col gap-8 w-fit">
                    <Button 
                        label="Default"
                    />

                    <Button 
                        label="Secondary"
                        size="small"
                        variant="secondary"
                    />

                    <Button 
                        label="Secondary medium"
                        size="medium"
                        variant="secondary"
                    />

                    <Button 
                        label="Secondary large"
                        size="large"
                        variant="secondary"
                    />

                    <Button 
                        label="Primary"
                        variant="primary"
                    />

                    <Button 
                        label="Cancel"
                        variant="destructive"
                    />

                    <Button 
                        label="Warning"
                        variant="warning"
                    />

                    <Button 
                        label="Success"
                        variant="success"
                    />

                    <Button 
                        label="Bordered"
                        variant="bordered"
                    />

                    <Button 
                        label="Transparent"
                        variant="transparent"
                    />

                    <div class="flex flex-col gap-2">
                        <p class="text-sm text-muted-foreground">
                            Grupo <code class="text-foreground">class="btn-group"</code>: bordas unidas, cantos só nas pontas.
                        </p>

                        <div class="btn-group">
                            <Button
                                label="Um"
                                variant="transparent"
                                :hoverEffect="false"
                            />

                            <Button
                                label="Dois"
                                variant="transparent"
                                :hoverEffect="false"
                            />

                            <Button
                                label="Três"
                                variant="transparent"
                                :hoverEffect="false"
                            />
                        </div>
                    </div>

                    <Button 
                        variant="secondary"
                        class="rounded-full!"
                        shape="rounded"
                        size="medium"
                    >
                        <span class="fa-solid fa-search text-sm" />
                    </Button>
                </div>
            </Accordion>

            <Accordion header="Badge">
                <div class="flex flex-col gap-8 w-fit">
                    <Badge label="Primary"/>
                    <Badge label="Secondary" variant="secondary"/>
                    <Badge label="Destructive" variant="destructive"/>
                    <Badge label="Warning" variant="warning"/>
                    <Badge label="Info" variant="info"/>
                    <Badge label="Link external" variant="secondary" type="link" :external="true" link="https://google.com"/>
                    <Badge label="Link internal" variant="secondary" type="link" link="/"/>
                </div>
            </Accordion>

            <Accordion header="Carousel">
                <Carousel
                    :images="[
                        {
                            src: 'https://i.imgur.com/vN9nvON.jpeg',
                            alt: 'Image 1'
                        },
                        {
                            src: 'https://i.imgur.com/wAwAYzQ.jpeg',
                            alt: 'Image 2'
                        },
                        {
                            src: 'https://i.imgur.com/4dIoDgD.jpeg',
                            alt: 'Image 3'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MTYlM0E5fGVufDB8fDB8fHww',
                            alt: 'Image 4'
                        }
                    ]"
                />
            </Accordion>

            <Accordion header="Checkbox">
                <div class="flex flex-col gap-2">
                    <Checkbox
                        label="This is a checkbox"
                        id="firt1"
                        name="cb1"
                        :value="false"
                    />

                    <Checkbox
                        label="This is a boolean"
                        id="firt2"
                        name="cb2"
                        :value="true"
                    />

                    <Checkbox
                        label="This is already checked"
                        id="firt3"
                        name="cb3"
                        :checked="true"
                        :value="true"
                    />

                    <Checkbox
                        label="This is disabled"
                        id="firt4"
                        name="cb4"
                        :value="false"
                        :disabled="true"
                    />

                    <Checkbox
                        label="This is a description"
                        id="firt5"
                        name="cb5"
                        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid recusandae vero, perferendis, eligendi animi eum quasi qui libero dolor omnis earum cum eos odio expedita ullam, provident labore hic quaerat."
                        :value="false"
                    />

                    <Checkbox
                        label="This is a card"
                        id="firt6"
                        name="cb6"
                        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid recusandae vero, perferendis, eligendi animi eum quasi qui libero dolor omnis earum cum eos odio expedita ullam, provident labore hic quaerat."
                        variant="card"
                        :value="false"
                    />

                    <Checkbox
                        label="This is a card"
                        id="firt7"
                        name="cb7"
                        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid recusandae vero, perferendis, eligendi animi eum quasi qui libero dolor omnis earum cum eos odio expedita ullam, provident labore hic quaerat."
                        variant="card"
                        :value="false"
                        :disabled="true"
                    />

                    <Checkbox
                        label="This is a switch"
                        id="firt8"
                        name="cb8"
                        checkboxStyle="switch"
                        :value="false"
                    />

                    <Checkbox
                        label="This is a switch"
                        id="firt9"
                        name="cb9"
                        checkboxStyle="switch"
                        :disabled="true"
                        :value="true"
                    />
                </div>
            </Accordion>

            <Accordion header="Cores">
                <div class="flex gap-2 flex-wrap">
                    <div v-for="color of [
                        {
                            color: 'background',
                            label: 'Background'
                        },
                        {
                            color: 'foreground',
                            label: 'Foreground'
                        },
                        {
                            color: 'card',
                            label: 'Card'
                        },
                        {
                            color: 'card-foreground',
                            label: 'Card Foreground'
                        },
                        {
                            color: 'popover',
                            label: 'Popover'
                        },
                        {
                            color: 'popover-foreground',
                            label: 'Popover Foreground'
                        },
                        {
                            color: 'primary',
                            label: 'Primary'
                        },
                        {
                            color: 'primary-foreground',
                            label: 'Primary Foreground'
                        },
                        {
                            color: 'secondary',
                            label: 'Secondary'
                        },
                        {
                            color: 'secondary-foreground',
                            label: 'Secondary Foreground'
                        },
                        {
                            color: 'muted',
                            label: 'Muted'
                        },
                        {
                            color: 'muted-foreground',
                            label: 'Muted Foreground'
                        },
                        {
                            color: 'accent',
                            label: 'Accent'
                        },
                        {
                            color: 'accent-foreground',
                            label: 'Accent Foreground'
                        },
                        {
                            color: 'destructive',
                            label: 'Destructive'
                        },
                        {
                            color: 'destructive-foreground',
                            label: 'Destructive Foreground'
                        },
                        {
                            color: 'success',
                            label: 'Success'
                        },
                        {
                            color: 'success-foreground',
                            label: 'Success Foreground'
                        },
                        {
                            color: 'warning',
                            label: 'Warning'
                        },
                        {
                            color: 'warning-foreground',
                            label: 'Warning Foreground'
                        },
                        {
                            color: 'info',
                            label: 'Info'
                        },
                        {
                            color: 'info-foreground',
                            label: 'Info Foreground'
                        },
                        {
                            color: 'border',
                            label: 'Border'
                        },
                        {
                            color: 'input',
                            label: 'Input'
                        },
                        {
                            color: 'ring',
                            label: 'Ring'
                        },
                        {
                            color: 'chart-1',
                            label: 'Chart 1'
                        },
                        {
                            color: 'chart-2',
                            label: 'Chart 2'
                        },
                        {
                            color: 'chart-3',
                            label: 'Chart 3'
                        },
                        {
                            color: 'chart-4',
                            label: 'Chart 4'
                        },
                        {
                            color: 'chart-5',
                            label: 'Chart 5'
                        },
                        {
                            color: 'sidebar',
                            label: 'Sidebar'
                        },
                        {
                            color: 'sidebar-foreground',
                            label: 'Sidebar Foreground'
                        },
                        {
                            color: 'sidebar-primary',
                            label: 'Sidebar Primary'
                        },
                        {
                            color: 'sidebar-primary-foreground',
                            label: 'Sidebar Primary Foreground'
                        },
                        {
                            color: 'sidebar-accent',
                            label: 'Sidebar Accent'
                        },
                        {
                            color: 'sidebar-accent-foreground',
                            label: 'Sidebar Accent Foreground'
                        },
                        {
                            color: 'sidebar-border',
                            label: 'Sidebar Border'
                        },
                        {
                            color: 'sidebar-ring',
                            label: 'Sidebar Ring'
                        },
                    ]" class="w-24 h-24">
                        <div class="border border-border rounded-lg h-14"
                            :style="{ backgroundColor: 'var(--color-' + color.color + ')' }" />

                        <p class="text-xs h-fit leading-4!">
                            {{ color.label }}
                        </p>
                    </div>
                </div>
            </Accordion>

            <Accordion header="Drawer">
                <div>
                    <Button
                        label="Drawer right"
                        class="mr-2"

                        @click="() => {drawerRight = !drawerRight}"
                    />

                    <Modal
                        size="small"
                        variant="drawer"
                        side="right"
                        
                        :isOpen="drawerRight"   

                        @update:value="(value) => {drawerRight = value}"    
                    >
                        <template #header>
                            This is the modal header
                        </template>

                        <template #description>
                            Lorem ipsum
                        </template>

                        <template #body>
                            <span v-for="n in 15" :key="n">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius, magnam, sunt culpa placeat quae ex ullam maxime, non dignissimos neque nulla id. Consequatur facere fugiat, ex reiciendis sequi dolor!
                            </span>
                        </template>

                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Confirm"

                                    @click="() => {drawerRight = !drawerRight}"
                                />
                            </div>
                        </template>
                    </Modal>

                    <Button
                        label="Drawer left"

                        @click="() => {drawerLeft = !drawerLeft}"
                    />

                    <Button
                        label="Drawer bottom"

                        class="ml-2"

                        @click="() => {drawerBottom = !drawerBottom}"
                    />

                    <Modal
                        size="small"
                        variant="drawer"
                        side="left"
                        
                        :isOpen="drawerLeft"   

                        @update:value="(value) => {drawerLeft = value}"    
                    >
                        <template #header>
                            This is the modal header
                        </template>

                        <template #description>
                            Lorem ipsum
                        </template>

                        <template #body>
                            <span v-for="n in 15" :key="n">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius, magnam, sunt culpa placeat quae ex ullam maxime, non dignissimos neque nulla id. Consequatur facere fugiat, ex reiciendis sequi dolor!
                            </span>
                        </template>

                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Confirm"

                                    @click="() => {drawerLeft = !drawerLeft}"
                                />
                            </div>
                        </template>
                    </Modal>

                    <Modal
                        size="medium"
                        variant="drawer"
                        side="bottom"

                        :isOpen="drawerBottom"

                        @update:value="(value) => {drawerBottom = value}"
                    >
                        <template #header>
                            Drawer bottom
                        </template>

                        <template #description>
                            Arraste para baixo ou use o backdrop para fechar.
                        </template>

                        <template #body>
                            <span v-for="n in 8" :key="n">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius, magnam, sunt culpa placeat quae ex ullam maxime, non dignissimos neque nulla id.
                            </span>
                        </template>

                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Fechar"

                                    @click="() => {drawerBottom = !drawerBottom}"
                                />
                            </div>
                        </template>
                    </Modal>
                </div>
            </Accordion>

            <Accordion header="Dropdown">
                <div class="flex flex-col gap-4 md:max-w-1/2 lg:max-w-1/4">
                    <Dropdown
                        header="Dropdown (click menu)"

                        :options="dropdownOption"
                    />

                    <Select
                        header="Select"

                        :options="selectOption"
                    />

                    <Popover header="Popover">
                        Teste
                    </Popover>

                    <Popover
                        header="Popover with hover"
                        openOnHover
                    >
                        Teste
                    </Popover>

                    <Popover
                        header="Popover with hover and slot"
                        openOnHover
                    >
                        <template #button>
                            <Input
                                type="text"
                                placeholder="This is with hover and slot #button"
                                id="input-with-hover-and-slot-button"
                            />
                        </template>

                        Teste
                    </Popover>

                    <Select
                        :search="{
                            external: false
                        }"

                        :options="selectOption"
                    />

                    <Select
                        header="Select with memo"
                        id="use-memo"
                        useMemo

                        :options="selectOption"
                    />

                    <Select
                        header="Select with selectMultiple"
                        :options="selectOption"
                        :selectMultiple="{ min: 0, max: 3 }"
                        helperText="Min. 0, max. 3"
                    />

                    <Select
                        header="Select with selectMultiple useMemo"
                        id="use-memo-multiple-example"
                        useMemo
                        :options="selectOption"
                        :selectMultiple="{ min: 0 }"
                    />
                </div>
            </Accordion>

            <Accordion header="Card">
                <div class="flex flex-col gap-8 w-fit">
                    <Card>
                        <template #header>
                            Header
                        </template>

                        <template #description>
                            Header description
                        </template>

                        <template #body>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ad illum assumenda, eum excepturi atque deserunt magni officia, ea, veritatis laborum sint exercitationem alias recusandae et autem itaque fugit cumque!
                        </template>

                        <template #footer>
                            teste
                        </template>
                    </Card>

                    <Card>
                        <template #header>
                            Header
                        </template>

                        <template #description>
                            Header description
                        </template>

                        <template #body>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ad illum assumenda, eum excepturi atque deserunt magni officia, ea, veritatis laborum sint exercitationem alias recusandae et autem itaque fugit cumque!
                        </template>
                    </Card>

                    <Card>
                        <template #header>
                            Header
                        </template>

                        <template #body>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ad illum assumenda, eum excepturi atque deserunt magni officia, ea, veritatis laborum sint exercitationem alias recusandae et autem itaque fugit cumque!
                        </template>
                    </Card>


                    <Card>
                        <template #body>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ad illum assumenda, eum excepturi atque deserunt magni officia, ea, veritatis laborum sint exercitationem alias recusandae et autem itaque fugit cumque!
                        </template>
                    </Card>
                </div>
            </Accordion>

            <Accordion header="Globals" pinnable>
                <div class="flex flex-col gap-4">
                    <h3 class="font-bold">Global <code>$project</code> state</h3>
                    <pre class="p-4 bg-muted/60 rounded text-xs max-w-2xl overflow-x-auto"><code>{{ JSON.stringify($project, null, 2) }}</code></pre>

                    <ul class="text-sm space-y-1">
                        <li><b>device.isMobile:</b> {{ $project.device.isMobile ? 'Yes' : 'No' }}</li>
                        <li><b>device.viewportWidth:</b> {{ $project.device.viewportWidth }}</li>
                        <li><b>device.mobileBreakpointPx:</b> {{ $project.device.mobileBreakpointPx }}</li>
                        <li><b>labels.siteTitle:</b> {{ $project.labels.siteTitle }}</li>
                        <li><b>user.name:</b> {{ $project.user.name ?? '[not set]' }}</li>
                        <li>
                            <b>url.query:</b>
                            <code class="block bg-muted px-2 py-1 rounded">
                                {{ JSON.stringify($project.url.query, null, 2) }}
                            </code>
                        </li>
                        <li>
                            <b>url.params (vue-router):</b>
                            <code class="block bg-muted px-2 py-1 rounded">
                                {{ JSON.stringify($project.url.params, null, 2) }}
                            </code>
                        </li>
                    </ul>
                </div>
            </Accordion>

            <Accordion header="Inputs">
                <div class="flex flex-col gap-8 w-fit">
                    <section>
                        <Input
                            id="default-input"
                            type="text"
                            label="Default Input"
                            placeholder="Place holder"
                            helper-text="This is a helper text"
                            class="w-fit"

                            :value="defaultInputValue"

                            @update:value="defaultInputValue = $event"
                        />

                        <p class="mt-4">Value: {{ defaultInputValue }}</p>
                    </section>

                    <div class="separator"/>

                    <section>
                        <Input
                            value="Celi Herstal"
                            id="view-data-input"
                            type="text"
                            label="Name"
                            variant="display"
                        />
                    </section>

                    <section>
                        <Input
                            value="sasbrazilian@gmail.com"
                            id="view-data-input-email"
                            type="email"
                            label="E-Mail"
                            variant="display"
                            copiable
                        />
                    </section>

                    <section>
                        <Input
                            v-model="passwordInputValue"
                            id="password-input"
                            type="password"
                            label="Password"
                            class="w-fit"
                            :helperText="`Value: ${passwordInputValue}`"
                        />
                    </section>

                    <div class="separator"/>
           
                    <section>
                        <Input
                            id="numeric-input"
                            type="number"
                            label="Numeric Input"
                            class="w-fit"

                            :value="numericInputValue"
                            :helperText="`Value: ${numericInputValue}`"

                            @update:value="numericInputValue = $event"
                        />

                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="email-input"
                            type="email"
                            label="Email"
                            class="w-fit"
                            :value="emailInputValue"
                            :helperText="`Value: ${emailInputValue}`"
                            @update:value="emailInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="phone-input"
                            type="phone"
                            label="Celular"
                            class="w-fit"

                            :minSize="3"
                            :value="phoneInputValue"
                            :helperText="`Value: ${phoneInputValue}`"
                            @update:value="phoneInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="CPF-input"
                            type="cpf"
                            label="CPF"
                            class="w-fit"

                            :value="CPFInputValue"
                            :helperText="`Value: ${CPFInputValue}`"
                            @update:value="CPFInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="CNPJ-input"
                            type="cnpj"
                            label="CNPJ"
                            class="w-fit"

                            :value="CNPJInputValue"
                            :helperText="`Value: ${CNPJInputValue}`"
                            @update:value="CNPJInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="CEP-input"
                            type="cep"
                            label="CEP"
                            class="w-fit"

                            :value="CEPInputValue"
                            :helperText="`Value: ${CEPInputValue}`"
                            @update:value="CEPInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="Date-input"
                            type="date"
                            label="Date"
                            class="w-fit"

                            :value="DateInputValue"
                            :helperText="`Value: ${DateInputValue}`"    
                            @update:value="DateInputValue = $event"
                        />
                    </section>

                    <div class="separator"/>
                    
                    <section>
                        <Input
                            id="textarea"
                            type="textarea"
                            label="Textarea"
                            class="w-fit"

                            :value="textAreaInput"
                            :helperText="`Value: ${textAreaInput}`"
                            @update:value="textAreaInput = $event"
                        />
                    </section>

                    <div class="separator"/>

                    <section>
                        <Input
                            id="password-demo"
                            type="password"
                            label="Senha (mostrar/ocultar)"
                            class="w-fit"

                            :value="passwordDemo"
                            :helperText="`Value: ${passwordDemo}`"
                            @update:value="passwordDemo = $event"
                        />
                    </section>

                    <div class="separator"/>

                    <section>
                        <Input
                            id="copiable-demo"
                            type="text"
                            label="Texto copiável"
                            class="w-fit"
                            copiable

                            :value="copiableDemo"
                            :helperText="`Value: ${copiableDemo}`"
                            @update:value="copiableDemo = $event"
                        />
                    </section>

                    <div class="separator"/>

                    <section>
                        <Input
                            id="Memo-input"
                            type="text"
                            label="Input with useMemo"
                            class="w-fit"
                            useMemo
                        />
                    </section>

                    <div class="separator"/>

                    <section class="max-w-xl">
                        <MediaUploader
                            id="media-uploader-dev-design"
                            label="Media Uploader"
                            helperText="Teste com imagens, pdf e áudio."
                            :maxFiles="6"
                            :accept="['image/*', '.pdf', 'audio/*', '.zip', '.txt']"
                            :value="mediaFiles"

                            @update:value="mediaFiles = $event"
                        />

                        <p class="mt-4">Value: {{ mediaFiles.map(file => file.name) }}</p>
                    </section>
                </div>
            </Accordion>

            <Accordion header="ProgressBar">
                <ProgressBar
                    v-model="progressBarValue"
                    label="Standart input range progress bar"
                    :helperText="`Value: ${progressBarValue}`"
                    showProgress
                />

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    label="Progress bar disabled"
                    :disabled="true"
                    :helperText="`Value: ${progressBarValue}`"
                    showProgress
                />

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    label="Progress bar readonly"
                    :readonly="true"
                    :helperText="`Value: ${progressBarValue}`"
                    showProgress
                />

                <div class="separator my-4"/>

                <div class="w-fit">
                    <ProgressBar
                        v-model="progressBarValue"
                        label="Input range vertical"
                        direction="vertical"
                        showProgress
                    />
                </div>

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    label="Progress circular small"
                    variant="circular"
                    size="small"
                    showProgress
                />

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    label="Progress circular medium"
                    variant="circular"
                    size="medium"
                />

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    label="Progress circular large"
                    variant="circular"
                    size="large"
                />

                <div class="separator my-4"/>

                <ProgressBar
                    v-model="progressBarValue"
                    :min="30"
                    :max="60"
                    label="Min: 30, Max: 60"
                    variant="circular"
                />

                <div class="separator my-4"/>

                <ProgressBar
                    label="Loading"
                    loading
                    variant="circular"
                />
            </Accordion>
            
            <Accordion header="Modal">
                <div class="flex flex-col gap-8 w-fit">
                    <div>
                        <Button
                            label="No footer no description"

                            @click="() => {fmodal = !fmodal}"
                        />

                        <Modal
                            size="small"
                            
                            :isOpen="fmodal"   

                            @update:value="(value) => {fmodal = value}"    
                        >
                            <template #header>
                                This is the modal header
                            </template>

                            <template #body>
                                <span v-for="n in 15" :key="n">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius, magnam, sunt culpa placeat quae ex ullam maxime, non dignissimos neque nulla id. Consequatur facere fugiat, ex reiciendis sequi dolor!
                                </span>
                            </template>
                        </Modal>
                    </div>

                    <div>
                        <Button
                            label="With description"

                            @click="() => {dmodal = !dmodal}"
                        />

                        <Modal
                            size="small"
                            
                            :isOpen="dmodal"   

                            @update:value="(value) => {dmodal = value}"    
                        >
                            <template #header>
                                This is the modal header
                            </template>

                            <template #description>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>

                            <template #body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime incidunt a! Asperiores amet temporibus quod repellendus cumque possimus saepe neque quibusdam, culpa, magni suscipit optio, nam ad repellat corrupti!
                            </template>
                        </Modal>
                    </div>

                    <div>
                        <Button
                            label="Small modal"

                            @click="() => {modalOpen = !modalOpen}"
                        />

                        <Modal
                            size="small"
                            
                            :isOpen="modalOpen"   

                            @update:value="(value) => {modalOpen = value}"    
                        >
                            <template #header>
                                This is the modal header
                            </template>

                            <template #body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime incidunt a! Asperiores amet temporibus quod repellendus cumque possimus saepe neque quibusdam, culpa, magni suscipit optio, nam ad repellat corrupti!
                            </template>

                            <template #footer>
                                <div class="flex justify-end gap-2">    
                                    <Button
                                        label="Cancel"
                                        variant="secondary"

                                        @click="() => {modalOpen = !modalOpen}"
                                    />

                                    <Button
                                        label="Submit"
                                        variant="primary"

                                        @click="() => {modalOpen = !modalOpen}"
                                    />
                                </div>
                            </template>
                        </Modal>
                    </div>

                    <div>
                        <Button
                            label="Medium modal"

                            @click="() => {mediumOpen = !mediumOpen}"
                        />

                        <Modal
                            size="medium"
                            
                            :isOpen="mediumOpen"   

                            @update:value="(value) => {mediumOpen = value}"    
                        >
                            <template #header>
                                This is the modal header
                            </template>

                            <template #body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime incidunt a! Asperiores amet temporibus quod repellendus cumque possimus saepe neque quibusdam, culpa, magni suscipit optio, nam ad repellat corrupti!
                            </template>

                            <template #footer>
                                <div class="flex justify-end gap-2">    
                                    <Button
                                        label="Cancel"
                                        variant="secondary"

                                        @click="() => {mediumOpen = !mediumOpen}"
                                    />

                                    <Button
                                        label="Submit"
                                        variant="primary"

                                        @click="() => {mediumOpen = !mediumOpen}"
                                    />
                                </div>
                            </template>
                        </Modal>
                    </div>

                    <div>
                        <Button
                            label="Large modal"

                            @click="() => {largeOpen = !largeOpen}"
                        />

                        <Modal
                            size="large"
                            
                            :isOpen="largeOpen"   

                            @update:value="(value) => {largeOpen = value}"    
                        >
                            <template #header>
                                This is the modal header
                            </template>

                            <template #body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime incidunt a! Asperiores amet temporibus quod repellendus cumque possimus saepe neque quibusdam, culpa, magni suscipit optio, nam ad repellat corrupti!
                            </template>

                            <template #footer>
                                <div class="flex justify-end gap-2">    
                                    <Button
                                        label="Cancel"
                                        variant="secondary"

                                        @click="() => {largeOpen = !largeOpen}"
                                    />

                                    <Button
                                        label="Submit"
                                        variant="primary"

                                        @click="() => {largeOpen = !largeOpen}"
                                    />
                                </div>
                            </template>
                        </Modal>
                    </div>

                    <div class="separator"/>

                    <div>
                        <ConfirmationModal
                            v-model:isOpen="openConfirmationModalPrimary"

                            title="Confirmation Primary"
                            description="Primary"
                            body="Confirm this for me then?"
                            confirmText="Confirm"
                            cancelText="Cancel"
                            variant="primary"

                            @confirm="$toast.success('Confirmed')"
                            @cancel="$toast.info('Canceled')"
                        />

                        <Button 
                            label="Confirmation Primary"
                            variant="primary"
                            @click="() => openConfirmationModalPrimary = true"
                        />
                    </div>

                    <div>
                        <ConfirmationModal
                            v-model:isOpen="openConfirmationModalWarning"

                            title="Confirmation Warining"
                            description="Warning"
                            body="Well you clicked, now what? Just press 'Ok' and we are good to go"
                            confirmText="Ok"
                            :cancelText="false"
                            variant="warning"

                            @confirm="$toast.success('Oked')"
                        />

                        <Button 
                            label="Confirmation Warining"
                            variant="warning"
                            @click="() => openConfirmationModalWarning = true"
                        />
                    </div>

                    <div>
                        <ConfirmationModal
                            v-model:isOpen="openConfirmationModalDestructive"

                            title="Confirmation Destructive"
                            description="Destructive"
                            body="Are you really sure?"
                            confirmText="Confirm"
                            cancelText="Cancel"
                            variant="destructive"

                            @confirm="$toast.success('Confirmed')"
                            @cancel="$toast.info('Canceled')"
                        />

                        <Button 
                            label="Confirmation Destructive"
                            variant="destructive"
                            @click="() => openConfirmationModalDestructive = true"
                        />
                    </div>

                    <div>
                        <ConfirmationModal
                            v-model:isOpen="openConfirmationModalSuccess"

                            title="Confirmation Success"
                            description="Success"
                            body="Are you really sure?"
                            confirmText="Confirm"
                            cancelText="Cancel"
                            variant="success"

                            @confirm="$toast.success('Confirmed')"
                            @cancel="$toast.info('Canceled')"
                        />

                        <Button 
                            label="Confirmation Success"
                            variant="success"
                            @click="() => openConfirmationModalSuccess = true"
                        />
                    </div>
                </div>
            </Accordion>

            <Accordion header="Radio">
                <div class="flex flex-col gap-2">
                    <Radio v-model="selectedRadio" label="This is a radio 1" value="opt-a" name="group-a" id="ra-1" description="Test 123"/>

                    <Radio v-model="selectedRadio" label="This is a radio 2" value="opt-b" name="group-a" id="ra-2" variant="card"/>

                    <Radio v-model="selectedRadio" label="This is a radio 3" value="opt-c" name="group-a" id="ra-3"/>
                </div>
            </Accordion>

            <Accordion header="Toast">
                <div class="flex gap-4">
                    <Button variant="success" @click="() => $toast.success('Toast sucsess')">
                        Toast success
                    </Button>

                    <Button variant="secondary" @click="() => $toast.info('Toast info')">
                        Toast info
                    </Button>

                    <Button variant="destructive" @click="() => $toast.error('Toast error')">
                        Toast error
                    </Button> 

                    <Button variant="warning" @click="() => $toast.warning('Toast warning')">
                        Toast warning
                    </Button>
                </div>
            </Accordion>
            
            <Accordion header="Tooltip">
                <Button v-tooltip="'Texto'">Tooltip</Button>

                <Button v-tooltip="'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius, magnam, sunt culpa placeat quae ex ullam maxime, non dignissimos neque nulla id. Consequatur facere fugiat, ex reiciendis sequi dolor!'" class="ml-2">Tooltip longo</Button>
            </Accordion>


            <Accordion header="Typography and others">
                <div class="flex flex-col gap-4">
                    <h1>h1 - The quick brown fox jumps over the lazy dog.</h1>
                    <h2>h2 - The quick brown fox jumps over the lazy dog.</h2>
                    <h3>h3 - The quick brown fox jumps over the lazy dog.</h3>
                    <h4>h4 - The quick brown fox jumps over the lazy dog.</h4>
                    <h5>h5 - The quick brown fox jumps over the lazy dog.</h5>
                    <h6>h6 - The quick brown fox jumps over the lazy dog.</h6>
                    <b>b - The quick brown fox jumps over the lazy dog.</b>
                    <p>p - The quick brown fox jumps over the lazy dog.</p>
                    <small>small - The quick brown fox jumps over the lazy dog.</small>
                    <span>span - The quick brown fox jumps over the lazy dog.</span>

                    <div class="separator my-2"></div>

                    <span>
                        fa-solid fa-spinner fa-spin:
                        <div class="fa-solid fa-spinner fa-spin"></div>
                    </span>
                </div>
            </Accordion>

            <div>
                <Accordion
                    header="Accordion bordered 1"
                    variant="bordered"
                >
                    Content inside 1
                </Accordion>
                <Accordion
                    header="Accordion bordered 2"
                    variant="bordered"
                >
                    Content inside 2 
                </Accordion>
                <Accordion
                    header="Accordion bordered 3"
                    variant="bordered"
                >
                    Content inside 3
                </Accordion>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <Table
                    title="Clients"
                    selectCols

                    :headers="[
                        {
                            label: 'Nome',
                            field: 'name',
                            position: 'start'
                        },
                        {
                            label: 'Celular',
                            field: 'phone',
                            position: 'center'
                        },
                        {
                            label: 'Email',
                            field: 'email',
                            position: 'start'
                        },
                        {
                            label: 'Cargo',
                            field: 'role',
                            position: 'end'
                        }
                    ]"

                    :data="[
                        {
                            name: 'Celi',
                            phone: '51 9 99329196',
                            email: 'email@adress',
                            role: 'Dev'
                        },
                        {
                            name: 'Herstal',
                            phone: '51 9 12345678',
                            email: 'email@com',
                            role: 'Design'
                        },
                        {
                            name: 'Code',
                            phone: '51 9 55443322',
                            email: 'email@net',
                            role: 'HR'
                        },
                    ]"
                />

                <Table
                    selectable
                    :headers="[
                        {
                            label: 'Nome',
                            field: 'name',
                            position: 'start'
                        },
                        {
                            label: 'Celular',
                            field: 'phone',
                            position: 'start'
                        },
                        {
                            label: 'Email',
                            field: 'email',
                            position: 'start'
                        }
                    ]"

                    :data="[
                        {
                            name: 'Celi',
                            phone: '51 9 99329196',
                            email: 'email@adress'
                        },
                        {
                            name: 'Herstal',
                            phone: '51 9 12345678',
                            email: 'email@com'
                        },
                        {
                            name: 'Code',
                            phone: '51 9 55443322',
                            email: 'email@net'
                        },
                    ]"
                />

                <Table
                    :headers="[
                        {
                            label: 'Nome',
                            field: 'name',
                            position: 'start'
                        },
                        {
                            label: 'Celular',
                            field: 'phone',
                            position: 'start'
                        }
                    ]"

                    :data="[
                        {
                            name: 'Celi',
                            phone: '51 9 99329196'
                        },
                        {
                            name: 'Herstal',
                            phone: '51 9 12345678'
                        },
                        {
                            name: 'Celi Herstal',
                            phone: '12 2 12244678'
                        },
                    ]"

                    :actions="{
                        inspect: true,
                        edit: true,
                        delete: true
                    }"
                />

                <Table
                    :headers="[
                        {
                            label: 'Nome',
                            field: 'name',
                            position: 'start'
                        },
                        {
                            label: 'Celular',
                            field: 'phone',
                            position: 'start'
                        },
                        {
                            label: 'Status',
                            field: 'badge',
                            position: 'center'
                        }
                    ]"

                    :data="[
                        {
                            name: 'Celi',
                            phone: '51 9 99329196',
                            badge: {
                                label: 'Aprovado',
                                variant: 'success'
                            }
                        },
                        {
                            name: 'Herstal',
                            phone: '51 9 12345678',
                            badge: {
                                label: 'Reprovado',
                                variant: 'destructive'
                            }
                        },
                        {
                            name: 'Celi Herstal',
                            phone: '12 2 12244678',
                            badge: {
                                label: 'Pendente',
                                variant: 'warning'
                            }
                        },
                    ]"
                />
            </div>
            
            <Pagination 
                id="pagination-1"
                useMemo
                :amount="50" 
                :showMax="$project.device.isMobile ? 3 : 5" 
            />

            <div class="separator my-4"/>

            <Tabs class="mb-4">
                <template #tab-title-0>
                    Tab A
                </template>

                <template #tab-content-0>
                    <Card>
                        <template #body>
                            Tab Content 1, is site mobile: {{ $project.device.isMobile }}
                        </template>
                    </Card>
                </template>

                <template #tab-title-1>
                    Tab B
                </template>

                <template #tab-content-1>
                    <Card>
                        <template #body>
                            Tab Content 2
                        </template>
                    </Card>
                </template>

                <template #tab-title-2>
                    Tab C
                </template>

                <template #tab-content-2>
                    <Card>
                        <template #body>
                            Tab Content 3
                        </template>
                    </Card>
                </template>

                <template #tab-title-3>
                    Tab D
                </template>

                <template #tab-content-3>
                    <Card>
                        <template #body>
                            Tab Content 4
                        </template>
                    </Card>
                </template>
            </Tabs>

            <Tabs variant="transparent">
                <template #tab-title-0>
                    Tab A
                </template>

                <template #tab-content-0>
                    <div class="border border-border rounded-lg p-4">
                        Tab Content 1
                    </div>
                </template>

                <template #tab-title-1>
                    Tab B
                </template>

                <template #tab-content-1>
                    <div class="border border-border rounded-lg p-4">
                        Tab Content 2
                    </div>
                </template>
            </Tabs>
        </div>

        <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TableCharts 
                header="Data Bars"
                description="This is a data bars component"
                variant="bars"

                :data="{
                    label: 'Vendas',
                    displayAs: 'sum',
                    items: [
                        { date: new Date(2023, 0, 1), value: 10 },
                        { date: new Date(2023, 1, 1), value: 28 },
                        { date: new Date(2023, 2, 1), value: 24 },
                        { date: new Date(2023, 3, 1), value: 32 },
                        { date: new Date(2023, 4, 1), value: 30 },
                        { date: new Date(2023, 5, 1), value: 36 },
                    ]
                }"
            />

            <TableCharts 
                header="Data Bars"
                description="This is a data bars component with negatives"
                variant="bars"

                :data="{
                    label: 'Compras',
                    displayAs: 'currency',
                    items: [
                        { date: new Date(2023, 0, 1), value: -10 },
                        { date: new Date(2023, 1, 1), value: 26 },
                        { date: new Date(2023, 2, 1), value: 12 },
                        { date: new Date(2023, 3, 1), value: -32 },
                        { date: new Date(2023, 4, 1), value: 32 },
                        { date: new Date(2023, 5, 1), value: 42 },
                    ]
                }"
            />
        </div>

        <TableCharts 
            header="Data Wave"
            description="This is a wave chart example with daily data"
            variant="wave"

            :data="{
                label: 'Acessos',
                displayAs: 'sum',
                items: [
                    { date: new Date(2023, 2, 1), value: 14 },
                    { date: new Date(2023, 2, 8), value: 18 },
                    { date: new Date(2023, 2, 15), value: 22 },
                    { date: new Date(2023, 2, 22), value: 17 },
                    { date: new Date(2023, 2, 29), value: 26 },
                    { date: new Date(2023, 3, 5), value: 20 },
                    { date: new Date(2023, 3, 12), value: 31 },
                    { date: new Date(2023, 3, 19), value: 24 },
                    { date: new Date(2023, 3, 26), value: 28 },
                    { date: new Date(2023, 4, 3), value: 19 },
                    { date: new Date(2023, 4, 10), value: 23 },
                    { date: new Date(2023, 4, 17), value: 27 },
                    { date: new Date(2023, 4, 24), value: 21 },
                    { date: new Date(2023, 4, 31), value: 29 },
                ]
            }"
        />
</template>

<script lang="ts">
// @ts-nocheck — large design-system showcase; vue-tsc hits excessive stack depth on `components`.
import { defineComponent } from "vue";
import Input from "@design/components/Input.vue";
import Dropdown from "@design/components/Dropdown.vue";
import Select from "@design/components/Select.vue";
import Popover from "@design/components/Popover.vue";
import Accordion from "@design/components/Accordion.vue";
import Button from "@design/components/Button.vue";
import Modal from "@design/components/Modal.vue";
import Badge from "@design/components/Badge.vue";
import Card from "@design/components/Card.vue";
import Carousel from "@design/components/Carousel.vue";
import Checkbox from "@design/components/Checkbox.vue";
import Radio from "@design/components/Radio.vue";
import Sidebar from "@design/components/custom/Sidebar.vue";
import Table from "@design/components/Table.vue";
import Tabs from "@design/components/Tabs.vue";
import TableCharts from "@design/components/custom/TableCharts.vue";
import MediaUploader from "@design/components/MediaUploader.vue";
import Pagination from "@design/components/custom/Pagination.vue";
import ProgressBar from "@design/components/ProgressBar.vue";
import ConfirmationModal from "@design/components/custom/ConfirmationModal.vue";

export default defineComponent({
    name: 'DevDesign',

    components: {
        Input,
        Button,
        Accordion,
        Dropdown,
        Select,
        Popover,
        Modal,
        Badge,
        Card,
        Carousel,
        Checkbox,
        Radio,
        Sidebar,
        Table,
        Tabs,
        TableCharts,
        MediaUploader,
        Pagination,
        ProgressBar,
        ConfirmationModal
    },

    data() {
        return {
            defaultInputValue: '',
            passwordInputValue: '',
            drawerRight: false,
            drawerLeft: false,
            drawerBottom: false,
            numericInputValue: 0,
            emailInputValue: '',
            phoneInputValue: '',
            textAreaInput: '',
            CPFInputValue: '',
            CNPJInputValue: '',
            CEPInputValue: '',
            DateInputValue: '',
            dropdownOption: [
                { label: 'Account' },
                { label: 'User', value: 'user', icon: 'fa-user' },
                { label: 'Email', value: 'email', icon: 'fa-envelope' },
                { separator: true },
                { label: 'Other' },
                { label: 'Exit', value: 'exit', icon: 'fa-right-from-bracket' }
            ],
            selectOption: [
                { label: "ABC", value: "abc"},
                { label: "DEF", value: "def"},
                { label: "123", value: "unodunotres"},
                { label: "ABC1", value: "abc1"},
                { label: "DEF1aaaaaaas aadadsadsadsadaaaa", value: "def1"},
                { label: "ABC2", value: "abc2"},
                { label: "DEF2", value: "def2"},
                { label: "ABC3", value: "abc3"},
                { label: "DEF3", value: "def3"},
                { label: "ABC4", value: "abc4"},
                { label: "DEF4", value: "def4"},
            ],
            fmodal: false,
            dmodal: false,
            modalOpen: false,
            mediumOpen: false,
            largeOpen: false,
            selectedRadio: '',
            mediaFiles: [] as File[],
            passwordDemo: '',
            copiableDemo: 'Copie este texto',
            progressBarValue: 25,
            Primary: false,
            openConfirmationModalPrimary: false,
            openConfirmationModalSuccess: false,
            openConfirmationModalDestructive: false,
            openConfirmationModalWarning: false,
        }
    }
})
</script>